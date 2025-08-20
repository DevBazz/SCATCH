import { useState, useRef } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Node } from "@tiptap/core";
import "../TipTap.css";

// Custom Image extension with alignment support
const CustomImage = Node.create({
  name: 'image',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      align: {
        default: 'left',
        parseHTML: element => element.getAttribute('data-align'),
        renderHTML: attributes => ({
          'data-align': attributes.align,
          style: attributes.align === 'center'
            ? 'display: block; margin-left: auto; margin-right: auto;'
            : attributes.align === 'right'
              ? 'display: block; margin-left: auto; margin-right: 0;'
              : attributes.align === 'justify'
                ? 'display: block; width: 100%;'
                : 'display: block; margin-right: auto; margin-left: 0;',
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
          alt: dom.getAttribute('alt'),
          title: dom.getAttribute('title'),
          align: dom.getAttribute('data-align') || 'left',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes];
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
      setImageAlign: align => ({ commands, state }) => {
        const { from, to } = state.selection;
        let updated = false;
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === this.name) {
            commands.updateAttributes(node.type, { align });
            updated = true;
          }
        });
        return updated;
      },
    };
  },
});

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", description: "", tags: "", featuredImage: "" });
  const fileInputRef = useRef(null);
  const featuredImageInputRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomImage, // Use custom image extension
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'listItem', 'bulletList', 'orderedList'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content: "<p>Write your post here...</p>",
  });

  const addImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post("http://localhost:3000/api/posts/upload-image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.url;
      editor.chain().focus().setImage({ src: imageUrl, align: 'left' }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const addFeaturedImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post("http://localhost:3000/api/posts/upload-image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.url;
      setFormData({ ...formData, featuredImage: imageUrl });
    } catch (err) {
      console.error("Featured image upload failed:", err);
    }
  };

  const triggerImageUpload = () => fileInputRef.current?.click();
  const triggerFeaturedImageUpload = () => featuredImageInputRef.current?.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, content: editor.getHTML() };
    try {
      await axios.post("http://localhost:3000/api/posts/create-post", payload, {
        withCredentials: true
      });
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkInput(false);
  };

  // Toolbar component
  const Toolbar = ({ editor }) => {
    if (!editor) return null;

    const setAlignment = (align) => {
      const { state } = editor;
      const { from, to } = state.selection;
      let isImageSelected = false;

      // Check if an image is selected
      state.doc.nodesBetween(from, to, (node) => {
        if (node.type.name === 'image') {
          isImageSelected = true;
        }
      });

      // Apply image alignment if an image is selected, otherwise apply text alignment
      if (isImageSelected) {
        editor.chain().focus().setImageAlign(align).run();
      } else {
        editor.chain().focus().setTextAlign(align).run();
      }
    };

    return (
      <div className="flex flex-wrap items-center gap-2 py-2 border-b border-gray-700 mb-3">
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('underline') ? 'bg-gray-700' : ''}`}
          title="Underline"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('strike') ? 'bg-gray-700' : ''}`}
          title="Strikethrough"
        >
          S
        </button>
        
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700' : ''}`}
          title="Heading 3"
        >
          H3
        </button>
        
        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
          title="Bullet List"
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700' : ''}`}
          title="Numbered List"
        >
          OL
        </button>
        
        {/* Alignments */}
        <button
          type="button"
          onClick={() => setAlignment('left')}
          className={`p-2 rounded hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'left' }) || editor.isActive('image', { align: 'left' })
              ? 'bg-gray-700'
              : ''
          }`}
          title="Align Left"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setAlignment('center')}
          className={`p-2 rounded hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'center' }) || editor.isActive('image', { align: 'center' })
              ? 'bg-gray-700'
              : ''
          }`}
          title="Align Center"
        >
          ↔
        </button>
        <button
          type="button"
          onClick={() => setAlignment('right')}
          className={`p-2 rounded hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'right' }) || editor.isActive('image', { align: 'right' })
              ? 'bg-gray-700'
              : ''
          }`}
          title="Align Right"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => setAlignment('justify')}
          className={`p-2 rounded hover:bg-gray-700 ${
            editor.isActive({ textAlign: 'justify' }) || editor.isActive('image', { align: 'justify' })
              ? 'bg-gray-700'
              : ''
          }`}
          title="Justify"
        >
          ⇶
        </button>
        
        {/* Link */}
        {showLinkInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
            />
            <button
              onClick={setLink}
              className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
              Apply
            </button>
            <button
              onClick={unsetLink}
              className="p-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(true);
              setLinkUrl(editor.getAttributes('link').href || "");
            }}
            className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-700' : ''}`}
            title="Link"
          >
            Link
          </button>
        )}
        
        {/* Blocks */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('blockquote') ? 'bg-gray-700' : ''}`}
          title="Blockquote"
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('codeBlock') ? 'bg-gray-700' : ''}`}
          title="Code Block"
        >
          Code
        </button>
        
        {/* Special elements */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-700"
          title="Horizontal Rule"
        >
          HR
        </button>
        <button
          type="button"
          onClick={triggerImageUpload}
          className="p-2 rounded hover:bg-gray-700"
          title="Insert Image"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="p-2 rounded hover:bg-gray-700"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>
    );
  };

  return (
    <main className="dark text-gray-100 bg-gray-900 min-h-screen min-w-[82.3vw]">
      <div className="p-6 mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Tags */}
          <div>
            <label className="block mb-1 text-gray-300">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. react, webdev"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Featured Image */}
          <div>
            <label className="block mb-1 text-gray-300">Featured Image (Thumbnail)</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={triggerFeaturedImageUpload}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Upload Featured Image
              </button>
              {formData.featuredImage && (
                <span className="text-gray-400 text-sm">Image uploaded</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={addFeaturedImage}
                ref={featuredImageInputRef}
                className="hidden"
              />
            </div>
          </div>
          {/* Editor */}
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <Toolbar editor={editor} />
            <input 
              type="file" 
              accept="image/*" 
              onChange={addImage} 
              ref={fileInputRef}
              className="hidden" 
            />
            <div className="prose prose-invert max-w-none">
              <EditorContent 
                editor={editor} 
                className="min-h-[300px] p-3 rounded" 
              />
            </div>
          </div>
          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;