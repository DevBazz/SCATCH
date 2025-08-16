import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const CreatePost = () => {
  const editor = useRef(null);
  const debounceRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Debounced state sync (no blur!)
  const handleEditorChange = useCallback((newContent) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFormData((prev) => ({ ...prev, content: newContent }));
    }, 300);
  }, []);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  // VERY IMPORTANT: memoize config so re-renders don't re-init Jodit/popup
  const joditConfig = useMemo(
    () => ({
      height: 400,
      readonly: false,
      iframe: true, // so heading styles apply
      toolbarAdaptive: false,
      toolbarSticky: true,
      style: {
        background: "#1f2937",
        color: "#fff",
        fontSize: "16px",
      },
      iframeStyle: `
        body { color: #fff; background: #1f2937; font-size: 16px; }
        h1 { font-size: 2em; font-weight: bold; }
        h2 { font-size: 1.5em; font-weight: bold; }
        h3 { font-size: 1.17em; font-weight: bold; }
        h4, h5, h6 { font-weight: bold; }
        p { font-size: 1em; }
      `,
      buttons: [
        "source", "|",
        "paragraph", "fontsize", "|",
        "bold", "italic", "underline", "strikethrough", "|",
        "ul", "ol", "outdent", "indent", "|",
        "link", "unlink", "image", "table", "|",
        "align", "brush", "eraser", "|",
        "undo", "redo", "|",
        "hr", "fullsize",
      ],
    }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make sure we capture the very latest HTML even if user hasn't paused typing
    const latestHtml =
      editor.current && editor.current.value ? editor.current.value : formData.content;

    const payload = { ...formData, content: latestHtml };
    console.log("Form Data:", payload);
    // send payload to backend API
  };

  return (
    <div className="min-w-[82.3vw] min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4 text-gray-100">
            Add New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title here..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            {/* Content */}
            <JoditEditor
              ref={editor}
              defaultValue={formData.content}    // ✅ uncontrolled
              config={joditConfig}               // ✅ memoized, stable reference
              tabIndex={1}
              onChange={handleEditorChange}      // ✅ debounced, does NOT blur
              // ❌ remove onBlur — it closes the link dialog
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Publish Post
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <div className="bg-gray-800 rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-3 text-gray-100">Meta Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="SEO-friendly meta description (max 160 chars)"
              maxLength={160}
              rows={4}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.description.length}/160 characters
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold mb-3 text-gray-100">Tags</h2>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. React, Web Development, JavaScript"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
