import React, { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link2,
  Unlink,
  ImagePlus,
  Minus,
  Table as TableIcon,
  RotateCcw,
  RotateCw,
  Palette,
  Highlighter,
  Eye,
  FileCode,
  Maximize2,
  Minimize2,
  Upload,
  X,
  Check,
  Info,
  Sparkles,
} from "lucide-react";
import { uploadImage, getErrorMessage } from "../../api/client";
import { resolveImageUrl } from "../../lib/image";
import { sanitizeBlogHtml, calculateReadingTime } from "../../lib/sanitizeHtml";
import toast from "react-hot-toast";

interface RichBlogEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const COLOR_PALETTE = [
  { name: "Default (Dark)", value: "#111827" },
  { name: "Muted Gray", value: "#4B5563" },
  { name: "BelTech Blue", value: "#0078B7" },
  { name: "Navy Blue", value: "#0A2540" },
  { name: "Emerald Green", value: "#059669" },
  { name: "Crimson Red", value: "#DC2626" },
  { name: "Amber Orange", value: "#D97706" },
  { name: "Deep Purple", value: "#7C3AED" },
  { name: "Teal Cyan", value: "#0891B2" },
];

const HIGHLIGHT_PALETTE = [
  { name: "None", value: "transparent" },
  { name: "Yellow", value: "#FEF08A" },
  { name: "Green", value: "#BBF7D0" },
  { name: "Blue", value: "#BAE6FD" },
  { name: "Pink", value: "#FBCFE8" },
  { name: "Orange", value: "#FED7AA" },
  { name: "Light Gray", value: "#E5E7EB" },
];

export const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your article here... Structure paragraphs, insert multiple images, customize fonts and colors...",
  minHeight = "420px",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);

  const [activeTab, setActiveTab] = useState<"visual" | "html" | "preview">("visual");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [htmlCode, setHtmlCode] = useState(value || "");

  // Popover controls
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#0078B7");

  // Modals
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCalloutMenu, setShowCalloutMenu] = useState(false);

  // Link form state
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(true);

  // Image form state
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageAlign, setImageAlign] = useState<"center" | "full" | "left" | "right">("center");
  const [imageWidth, setImageWidth] = useState<"100%" | "75%" | "50%" | "320px">("100%");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save current selection inside editor
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        savedSelectionRef.current = range.cloneRange();
        return;
      }
    }
  };

  // Restore saved selection
  const restoreSelection = () => {
    if (savedSelectionRef.current && editorRef.current) {
      editorRef.current.focus();
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRef.current);
      }
    }
  };

  // Sync internal editor content with incoming value on init or external changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // Only update if visually different to prevent cursor jumping
      if (editorRef.current.innerHTML.trim() !== (value || "").trim()) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setHtmlCode(value || "");
  }, [value]);

  // Handle content edits in visual mode
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlCode(html);
      onChange(html);
    }
  };

  // Exec command wrapper
  const exec = (command: string, arg: string | undefined = undefined) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, arg);
    handleInput();
  };

  // Formatting actions
  const applyHeading = (tag: string) => {
    editorRef.current?.focus();
    restoreSelection();
    if (tag === "p") {
      document.execCommand("formatBlock", false, "<p>");
    } else {
      document.execCommand("formatBlock", false, `<${tag}>`);
    }
    handleInput();
  };

  const applyFontFamily = (family: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("fontName", false, family);
    handleInput();
  };

  const applyFontSize = (size: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("fontSize", false, size);
    handleInput();
  };

  const applyTextColor = (color: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("foreColor", false, color);
    setShowColorPicker(false);
    handleInput();
  };

  const applyHighlight = (color: string) => {
    editorRef.current?.focus();
    restoreSelection();
    if (color === "transparent") {
      document.execCommand("removeFormat", false);
    } else {
      document.execCommand("hiliteColor", false, color);
    }
    setShowHighlightPicker(false);
    handleInput();
  };

  // Link insertion
  const openLinkModal = () => {
    saveSelection();
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString() : "";
    setLinkText(selectedText);
    setLinkUrl("");
    setLinkNewTab(true);
    setShowLinkModal(true);
  };

  const handleInsertLink = (
    e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!linkUrl) {
      toast.error("Please enter a URL");
      return;
    }
    restoreSelection();
    editorRef.current?.focus();

    let finalUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("/")) {
      finalUrl = `https://${finalUrl}`;
    }

    const displayText = linkText.trim() || finalUrl;
    const targetAttr = linkNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    const linkHtml = `<a href="${finalUrl}"${targetAttr} class="text-[#0078B7] underline hover:text-[#005c8a] font-medium">${displayText}</a>`;

    insertHtmlAtCursor(linkHtml);
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    toast.success("Link inserted");
  };

  // Open Image modal
  const openImageModal = () => {
    saveSelection();
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setImageAlign("center");
    setImageWidth("100%");
    setShowImageModal(true);
  };

  // Handle Image upload
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file");
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      if (!imageAlt) {
        setImageAlt(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      }
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to upload image"));
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Insert image into editor at cursor location
  const handleInsertImage = (
    e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!imageUrl.trim()) {
      toast.error("Please provide or upload an image first");
      return;
    }

    const resolved = resolveImageUrl(imageUrl.trim());
    const alt = imageAlt.trim() || "Article illustration";
    const captionHtml = imageCaption.trim()
      ? `<figcaption class="text-center text-sm text-gray-500 mt-2 italic">${imageCaption.trim()}</figcaption>`
      : "";

    let alignClass = "align-center";
    let styleAttr = "";

    if (imageAlign === "full") {
      alignClass = "align-full";
      styleAttr = 'style="width: 100%; max-width: 100%;"';
    } else if (imageAlign === "left") {
      alignClass = "align-left";
      styleAttr = `style="max-width: ${imageWidth === "100%" ? "45%" : imageWidth};"`;
    } else if (imageAlign === "right") {
      alignClass = "align-right";
      styleAttr = `style="max-width: ${imageWidth === "100%" ? "45%" : imageWidth};"`;
    } else {
      alignClass = "align-center";
      styleAttr = imageWidth !== "100%" ? `style="max-width: ${imageWidth}; margin-inline: auto;"` : "";
    }

    const figureHtml = `
      <figure class="blog-image ${alignClass} my-6" ${styleAttr}>
        <img src="${resolved}" alt="${alt}" class="rounded-xl shadow-sm w-full h-auto object-cover" loading="lazy" />
        ${captionHtml}
      </figure>
      <p><br></p>
    `;

    restoreSelection();
    insertHtmlAtCursor(figureHtml);
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    toast.success("Image placed in article!");
  };

  // Insert Callout Box
  const insertCallout = (type: "info" | "tip" | "warning") => {
    restoreSelection();
    let title = "Key Insight";
    let icon = "💡";
    let className = "callout-info";

    if (type === "tip") {
      title = "Pro Tip";
      icon = "✨";
      className = "callout-tip";
    } else if (type === "warning") {
      title = "Important Consideration";
      icon = "⚠️";
      className = "callout-warning";
    }

    const calloutHtml = `
      <div class="callout-box ${className} my-6 p-4 rounded-xl border-l-4">
        <div class="font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <span>${icon}</span> <span>${title}</span>
        </div>
        <p class="mb-0 text-base leading-relaxed">Add your key takeaway or critical advice here...</p>
      </div>
      <p><br></p>
    `;

    insertHtmlAtCursor(calloutHtml);
    setShowCalloutMenu(false);
    toast.success(`${title} box added`);
  };

  // Insert Table
  const insertTable = (rows: number, cols: number) => {
    restoreSelection();
    let tableHtml = `<table class="w-full my-6 border-collapse text-left text-sm border border-gray-200"><thead><tr class="bg-gray-100">`;
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th class="border border-gray-300 p-2 font-semibold">Header ${c + 1}</th>`;
    }
    tableHtml += `</tr></thead><tbody>`;
    for (let r = 0; r < rows; r++) {
      tableHtml += `<tr class="${r % 2 === 0 ? "bg-white" : "bg-gray-50"}">`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td class="border border-gray-300 p-2">Item ${r + 1}-${c + 1}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p><br></p>`;

    insertHtmlAtCursor(tableHtml);
    toast.success("Table inserted");
  };

  // Helper to insert arbitrary HTML at the saved selection range
  const insertHtmlAtCursor = (html: string) => {
    editorRef.current?.focus();
    const sel = window.getSelection();

    if (sel && sel.rangeCount > 0) {
      let range = savedSelectionRef.current;
      if (!range || !editorRef.current?.contains(range.commonAncestorContainer)) {
        range = sel.getRangeAt(0);
      }

      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        range.deleteContents();
        const el = document.createElement("div");
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode: Node | null = null;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        handleInput();
        return;
      }
    }

    // Fallback: append to end of editor
    if (editorRef.current) {
      editorRef.current.innerHTML += html;
      handleInput();
    }
  };

  // Handle HTML code view changes
  const handleHtmlCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlCode(val);
    onChange(val);
    if (editorRef.current) {
      editorRef.current.innerHTML = val;
    }
  };

  // Calculate statistics
  const currentText = (htmlCode || "").replace(/<[^>]*>/g, " ").trim();
  const wordCount = currentText ? currentText.split(/\s+/).filter(Boolean).length : 0;
  const readTime = calculateReadingTime(htmlCode || "");

  return (
    <div
      className={`border border-gray-300 rounded-xl bg-white shadow-sm flex flex-col transition-all ${
        isFullscreen ? "fixed inset-4 z-50 shadow-2xl flex flex-col" : "relative"
      }`}
    >
      {/* Top Header / View Switcher */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/80 px-3 py-2 rounded-t-xl flex-wrap gap-2">
        <div className="flex items-center gap-1 bg-gray-200/80 p-0.5 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              if (editorRef.current && activeTab === "html") {
                editorRef.current.innerHTML = htmlCode;
                onChange(htmlCode);
              }
              setActiveTab("visual");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "visual"
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#0078B7]" />
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => {
              const currentHtml = editorRef.current?.innerHTML || value || "";
              setHtmlCode(currentHtml);
              setActiveTab("html");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "html"
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileCode className="h-3.5 w-3.5 text-emerald-600" />
            HTML Source
          </button>
          <button
            type="button"
            onClick={() => {
              if (editorRef.current && activeTab === "visual") {
                const currentHtml = editorRef.current.innerHTML;
                setHtmlCode(currentHtml);
                onChange(currentHtml);
              }
              setActiveTab("preview");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-purple-600" />
            Live Preview
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>~{readTime} min read</span>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Formatting Toolbar (Active in Visual Mode) */}
      {activeTab === "visual" && (
        <div className="border-b border-gray-200 bg-white px-2 py-1.5 flex flex-wrap items-center gap-1 sticky top-0 z-20">
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-gray-200">
            <button
              type="button"
              onClick={() => exec("undo")}
              title="Undo (Ctrl+Z)"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("redo")}
              title="Redo (Ctrl+Y)"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          {/* Heading / Structure Dropdown */}
          <div className="flex items-center pr-1 border-r border-gray-200">
            <select
              onChange={(e) => applyHeading(e.target.value)}
              defaultValue="p"
              className="text-xs bg-gray-50 border border-gray-200 text-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0078B7]"
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center pr-1 border-r border-gray-200">
            <select
              onChange={(e) => applyFontFamily(e.target.value)}
              defaultValue="Open Sans, sans-serif"
              className="text-xs bg-gray-50 border border-gray-200 text-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0078B7]"
            >
              <option value="Open Sans, sans-serif">Sans (Default)</option>
              <option value="Inter, system-ui, sans-serif">Inter</option>
              <option value="Georgia, serif">Editorial Serif</option>
              <option value="'Courier New', monospace">Technical Mono</option>
              <option value="'Trebuchet MS', sans-serif">Display Accent</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center pr-1 border-r border-gray-200">
            <select
              onChange={(e) => applyFontSize(e.target.value)}
              defaultValue="3"
              className="text-xs bg-gray-50 border border-gray-200 text-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0078B7]"
            >
              <option value="2">Small (14px)</option>
              <option value="3">Normal (16px)</option>
              <option value="4">Medium (18px)</option>
              <option value="5">Large (22px)</option>
              <option value="6">Huge (28px)</option>
            </select>
          </div>

          {/* Basic Text Styles */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-gray-200">
            <button
              type="button"
              onClick={() => exec("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Underline className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("strikeThrough")}
              title="Strikethrough"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                restoreSelection();
                insertHtmlAtCursor('<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded font-mono text-sm">code</code>');
              }}
              title="Inline Code"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Code className="h-4 w-4" />
            </button>
          </div>

          {/* Colors & Highlight */}
          <div className="flex items-center gap-1 pr-1 border-r border-gray-200 relative">
            {/* Text Color */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  saveSelection();
                  setShowColorPicker(!showColorPicker);
                  setShowHighlightPicker(false);
                }}
                title="Text Color"
                className="flex items-center gap-1 p-1.5 rounded hover:bg-gray-100 text-gray-700"
              >
                <Palette className="h-4 w-4 text-[#0078B7]" />
                <span className="text-[11px] font-medium hidden sm:inline">Color</span>
              </button>

              {showColorPicker && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-30 w-48">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Text Color</p>
                  <div className="grid grid-cols-5 gap-1.5 mb-2.5">
                    {COLOR_PALETTE.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => applyTextColor(c.value)}
                        title={c.name}
                        className="h-6 w-6 rounded-md border border-gray-300 transition-transform hover:scale-110"
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="h-7 w-7 rounded border border-gray-300 cursor-pointer p-0"
                    />
                    <button
                      type="button"
                      onClick={() => applyTextColor(customColor)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded font-medium flex-1"
                    >
                      Apply Hex
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Background Highlight */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  saveSelection();
                  setShowHighlightPicker(!showHighlightPicker);
                  setShowColorPicker(false);
                }}
                title="Highlight Background"
                className="flex items-center gap-1 p-1.5 rounded hover:bg-gray-100 text-gray-700"
              >
                <Highlighter className="h-4 w-4 text-amber-500" />
                <span className="text-[11px] font-medium hidden sm:inline">Highlight</span>
              </button>

              {showHighlightPicker && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-30 w-44">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Highlight Color</p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {HIGHLIGHT_PALETTE.map((h) => (
                      <button
                        key={h.value}
                        type="button"
                        onClick={() => applyHighlight(h.value)}
                        title={h.name}
                        className="h-6 w-6 rounded-md border border-gray-300 flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: h.value }}
                      >
                        {h.value === "transparent" ? "✕" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-gray-200">
            <button
              type="button"
              onClick={() => exec("justifyLeft")}
              title="Align Left"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyCenter")}
              title="Align Center"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyRight")}
              title="Align Right"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <AlignRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyFull")}
              title="Justify"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <AlignJustify className="h-4 w-4" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center gap-0.5 pr-1 border-r border-gray-200">
            <button
              type="button"
              onClick={() => exec("insertUnorderedList")}
              title="Bulleted List"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => exec("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                restoreSelection();
                insertHtmlAtCursor('<blockquote class="border-l-4 border-[#0078B7] bg-blue-50/70 p-4 rounded-r-lg italic text-gray-700 my-4"><p>Quote or highlighted thought...</p></blockquote><p><br></p>');
              }}
              title="Blockquote"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Quote className="h-4 w-4" />
            </button>
          </div>

          {/* Rich Structuring: Multiple Images & Callouts */}
          <div className="flex items-center gap-1">
            {/* Insert Multiple Images Anywhere */}
            <button
              type="button"
              onClick={openImageModal}
              title="Place Image in Article"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <ImagePlus className="h-4 w-4 text-emerald-600" />
              <span>Insert Image</span>
            </button>

            {/* Link & Unlink */}
            <button
              type="button"
              onClick={openLinkModal}
              title="Insert Link"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                restoreSelection();
                exec("unlink");
                toast.success("Link removed");
              }}
              title="Remove Link"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Unlink className="h-4 w-4" />
            </button>

            {/* Callouts Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  saveSelection();
                  setShowCalloutMenu(!showCalloutMenu);
                }}
                title="Insert Callout Card"
                className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
              >
                <Info className="h-3.5 w-3.5 text-blue-600" />
                <span>Callout</span>
              </button>

              {showCalloutMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1.5 z-30 w-44">
                  <button
                    type="button"
                    onClick={() => insertCallout("info")}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#0078B7]" />
                    Info Callout
                  </button>
                  <button
                    type="button"
                    onClick={() => insertCallout("tip")}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    Pro Tip Box
                  </button>
                  <button
                    type="button"
                    onClick={() => insertCallout("warning")}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-amber-50 flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Warning / Note Box
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <button
              type="button"
              onClick={() => {
                saveSelection();
                insertTable(3, 3);
              }}
              title="Insert 3x3 Table"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <TableIcon className="h-4 w-4" />
            </button>

            {/* Horizontal Rule */}
            <button
              type="button"
              onClick={() => {
                restoreSelection();
                exec("insertHorizontalRule");
              }}
              title="Horizontal Divider"
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 flex flex-col min-h-[400px]">
        {/* Tab 1: Visual Mode (always mounted to preserve DOM and content) */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={() => {
            saveSelection();
            handleInput();
          }}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          className={`blog-content flex-1 p-6 focus:outline-none overflow-y-auto leading-relaxed text-gray-800 ${
            activeTab === "visual" ? "block" : "hidden"
          }`}
          style={{ minHeight }}
          data-placeholder={placeholder}
        />

        {/* Tab 2: HTML Source Mode */}
        <div
          className={`flex-1 flex flex-col p-4 bg-gray-900 text-gray-100 rounded-b-xl font-mono text-sm ${
            activeTab === "html" ? "flex" : "hidden"
          }`}
        >
          <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
            <span>Direct HTML Editor (Changes sync live with visual editor)</span>
            <span>UTF-8 HTML5</span>
          </div>
          <textarea
            value={htmlCode}
            onChange={handleHtmlCodeChange}
            className="flex-1 w-full bg-transparent text-emerald-400 font-mono text-sm leading-relaxed focus:outline-none resize-none min-h-[380px]"
            placeholder="<p>Write raw HTML here...</p>"
          />
        </div>

        {/* Tab 3: Live Preview Mode */}
        {activeTab === "preview" && (
          <div className="flex-1 p-8 bg-gray-50/50 overflow-y-auto rounded-b-xl">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Eye className="h-4 w-4 text-[#0078B7]" />
                Live Article Preview
              </div>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogHtml(htmlCode || "<p class='text-gray-400 italic'>No content written yet.</p>"),
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Insert Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto animate-in fade-in-50">
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <ImagePlus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Insert Image Anywhere</h3>
                <p className="text-xs text-gray-500">
                  Place multiple images in any paragraph or section with custom alignment.
                </p>
              </div>
            </div>

            {/* Source tabs */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  imageTab === "upload" ? "bg-white text-gray-900 shadow-xs font-semibold" : "text-gray-600"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  imageTab === "url" ? "bg-white text-gray-900 shadow-xs font-semibold" : "text-gray-600"
                }`}
              >
                <Link2 className="h-3.5 w-3.5" />
                Image URL
              </button>
            </div>

            <div className="space-y-4">
              {imageTab === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadFile}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#0078B7] rounded-xl p-6 text-center cursor-pointer bg-gray-50/50 hover:bg-blue-50/30 transition-colors"
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center justify-center py-2">
                        <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mb-2" />
                        <p className="text-sm font-medium text-gray-700">Uploading image to server...</p>
                      </div>
                    ) : imageUrl ? (
                      <div className="space-y-2">
                        <img
                          src={resolveImageUrl(imageUrl)}
                          alt="Preview"
                          className="h-32 mx-auto rounded-lg object-cover shadow-sm"
                        />
                        <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                          <Check className="h-4 w-4" /> Ready to insert! Click to choose a different image.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-700">Click to select an image from your computer</p>
                        <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, WebP, SVG</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg or /uploads/..."
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0078B7] focus:outline-none"
                  />
                  {imageUrl && (
                    <div className="mt-2 text-center">
                      <img
                        src={resolveImageUrl(imageUrl)}
                        alt="Preview"
                        className="h-24 mx-auto rounded-md object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/new-logo-free.png";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Layout Alignment Options */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Alignment & Flow in Article
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setImageAlign("center")}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      imageAlign === "center"
                        ? "border-[#0078B7] bg-blue-50 text-[#0078B7] font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlign("full")}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      imageAlign === "full"
                        ? "border-[#0078B7] bg-blue-50 text-[#0078B7] font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Full Width
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlign("left")}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      imageAlign === "left"
                        ? "border-[#0078B7] bg-blue-50 text-[#0078B7] font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Left Wrap
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageAlign("right")}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      imageAlign === "right"
                        ? "border-[#0078B7] bg-blue-50 text-[#0078B7] font-bold"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Right Wrap
                  </button>
                </div>
              </div>

              {/* Width / Size preset (when not full) */}
              {imageAlign !== "full" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Image Size</label>
                  <select
                    value={imageWidth}
                    onChange={(e) =>
                      setImageWidth(e.target.value as "100%" | "75%" | "50%" | "320px")
                    }
                    className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="100%">Standard (100% of container)</option>
                    <option value="75%">Medium-Large (75%)</option>
                    <option value="50%">Half Size (50%)</option>
                    <option value="320px">Compact (320px)</option>
                  </select>
                </div>
              )}

              {/* Caption & Alt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Alt Text (SEO)</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Short description"
                    className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Caption (Optional)</label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Displays under image"
                    className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertImage()}
                  disabled={!imageUrl || uploadingImage}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Check className="h-4 w-4" />
                  Insert Image at Cursor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insert Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in-50">
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Link2 className="h-5 w-5 text-[#0078B7]" />
              Insert Hyperlink
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Web Address (URL) *</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertLink();
                    }
                  }}
                  placeholder="https://example.com"
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0078B7] focus:outline-none"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertLink();
                    }
                  }}
                  placeholder="Click here (optional)"
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0078B7] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="linkNewTab"
                  checked={linkNewTab}
                  onChange={(e) => setLinkNewTab(e.target.checked)}
                  className="h-4 w-4 text-[#0078B7] rounded border-gray-300"
                />
                <label htmlFor="linkNewTab" className="text-xs text-gray-700">
                  Open link in a new tab
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertLink()}
                  className="px-4 py-2 bg-[#0078B7] hover:bg-[#005c8a] text-white rounded-lg text-xs font-semibold"
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichBlogEditor;
