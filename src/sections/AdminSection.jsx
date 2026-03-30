import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Headphones,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  X
} from "lucide-react";
import { Container } from "../components/Container";
import { SectionIntro } from "../components/SectionIntro";

const projectTemplate = {
  title: "",
  category: "",
  year: "",
  status: "",
  description: "",
  tags: "",
  accent: "from-[#92b1ff]/20 via-transparent to-transparent",
  image: "",
  gallery: []
};

const poetryTemplate = {
  title: "",
  type: "",
  excerpt: "",
  note: "",
  image: "",
  audio: ""
};

export function AdminSection({
  projects,
  poetryCards,
  onCreateProject,
  onCreatePoetry,
  onUpdateProject,
  onUpdatePoetry,
  onDeleteProject,
  onDeletePoetry,
  onReplaceProjects,
  onReplacePoetry,
  onLock
}) {
  const [projectForm, setProjectForm] = useState(projectTemplate);
  const [poetryForm, setPoetryForm] = useState(poetryTemplate);
  const [editingProjectTitle, setEditingProjectTitle] = useState("");
  const [editingPoetryTitle, setEditingPoetryTitle] = useState("");
  const [error, setError] = useState("");
  const importInputRef = useRef(null);

  const updateProjectField = (event) => {
    const { name, value } = event.target;
    setProjectForm((current) => ({ ...current, [name]: value }));
  };

  const updatePoetryField = (event) => {
    const { name, value } = event.target;
    setPoetryForm((current) => ({ ...current, [name]: value }));
  };

  const submitProject = (event) => {
    event.preventDefault();

    const preparedProject = {
      ...projectForm,
      image: projectForm.image || projectForm.gallery[0] || "",
      tags: projectForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    if (editingProjectTitle) {
      onUpdateProject(editingProjectTitle, preparedProject);
      setEditingProjectTitle("");
    } else {
      onCreateProject(preparedProject);
    }
    setProjectForm(projectTemplate);
  };

  const submitPoetry = (event) => {
    event.preventDefault();

    if (editingPoetryTitle) {
      onUpdatePoetry(editingPoetryTitle, poetryForm);
      setEditingPoetryTitle("");
    } else {
      onCreatePoetry(poetryForm);
    }
    setPoetryForm(poetryTemplate);
  };

  const startProjectEdit = (project) => {
    setEditingProjectTitle(project.title);
    setProjectForm({
      title: project.title || "",
      category: project.category || "",
      year: project.year || "",
      status: project.status || "",
      description: project.description || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
      accent: project.accent || projectTemplate.accent,
      image: project.image || "",
      gallery: Array.isArray(project.gallery) ? project.gallery : []
    });
  };

  const startPoetryEdit = (poem) => {
    setEditingPoetryTitle(poem.title);
    setPoetryForm({
      title: poem.title || "",
      type: poem.type || "",
      excerpt: poem.excerpt || "",
      note: poem.note || "",
      image: poem.image || "",
      audio: poem.audio || ""
    });
  };

  const cancelProjectEdit = () => {
    setEditingProjectTitle("");
    setProjectForm(projectTemplate);
  };

  const cancelPoetryEdit = () => {
    setEditingPoetryTitle("");
    setPoetryForm(poetryTemplate);
  };

  const exportJson = () => {
    const payload = {
      projects,
      poetryCards
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "gwachey-dreamer-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed.projects)) {
        onReplaceProjects(parsed.projects);
      }

      if (Array.isArray(parsed.poetryCards)) {
        onReplacePoetry(parsed.poetryCards);
      }

      setError("");
    } catch (importError) {
      setError("Import failed. Use a valid backup JSON file.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <section id="admin" className="section-shell relative border-b border-white/6 py-24 sm:py-32 lg:py-36">
      <Container>
        <button
          type="button"
          onClick={onLock}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        <SectionIntro
          eyebrow="Admin"
          title="A protected local control room for your portfolio content."
          body="Create, edit, update, delete, import, export, and attach images to project cards and poetry posts. Changes are stored in local storage on this device."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <Download size={16} />
            Export JSON Backup
          </button>
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <Upload size={16} />
            Import JSON Backup
          </button>
          <button
            type="button"
            onClick={onLock}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <ArrowLeft size={16} />
            Exit Dashboard
          </button>
          <input ref={importInputRef} type="file" accept="application/json" hidden onChange={importJson} />
        </div>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

        <div className="mt-16 grid gap-6 xl:grid-cols-[1fr,1fr]">
          <motion.form
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            onSubmit={submitProject}
            className="editorial-panel rounded-[2rem] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-ember" />
              <h3 className="font-display text-2xl text-white">
                {editingProjectTitle ? "Edit Project Post" : "Create Project Post"}
              </h3>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Input label="Title" name="title" value={projectForm.title} onChange={updateProjectField} />
              <Input label="Category" name="category" value={projectForm.category} onChange={updateProjectField} />
              <Input label="Year" name="year" value={projectForm.year} onChange={updateProjectField} />
              <Input label="Status" name="status" value={projectForm.status} onChange={updateProjectField} />
            </div>

            <div className="mt-4 grid gap-4">
              <TextArea label="Description" name="description" value={projectForm.description} onChange={updateProjectField} />
              <Input
                label="Tags"
                name="tags"
                value={projectForm.tags}
                onChange={updateProjectField}
                placeholder="Marketplace, Product Strategy, UI Systems"
              />
              <Input
                label="Accent Gradient"
                name="accent"
                value={projectForm.accent}
                onChange={updateProjectField}
                placeholder="from-[#92b1ff]/20 via-transparent to-transparent"
              />
              <ImageInput
                label="Project Cover"
                value={projectForm.image}
                onChange={(value) => setProjectForm((current) => ({ ...current, image: value }))}
              />
              <GalleryInput
                label="Case Study Gallery"
                values={projectForm.gallery}
                onChange={(value) => setProjectForm((current) => ({ ...current, gallery: value }))}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                {editingProjectTitle ? <Save size={16} /> : <Plus size={16} />}
                {editingProjectTitle ? "Update Project" : "Add Project"}
              </button>
              {editingProjectTitle ? (
                <button
                  type="button"
                  onClick={cancelProjectEdit}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  <X size={16} />
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </motion.form>

          <motion.form
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            onSubmit={submitPoetry}
            className="editorial-panel rounded-[2rem] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-ember" />
              <h3 className="font-display text-2xl text-white">
                {editingPoetryTitle ? "Edit Poetry Post" : "Create Poetry Post"}
              </h3>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Input label="Title" name="title" value={poetryForm.title} onChange={updatePoetryField} />
              <Input label="Type" name="type" value={poetryForm.type} onChange={updatePoetryField} />
            </div>

            <div className="mt-4 grid gap-4">
              <TextArea label="Excerpt" name="excerpt" value={poetryForm.excerpt} onChange={updatePoetryField} />
              <TextArea label="Note" name="note" value={poetryForm.note} onChange={updatePoetryField} />
              <ImageInput
                label="Poetry Thumbnail"
                value={poetryForm.image}
                onChange={(value) => setPoetryForm((current) => ({ ...current, image: value }))}
              />
              <AudioInput
                label="Audio Recitation"
                value={poetryForm.audio}
                onChange={(value) => setPoetryForm((current) => ({ ...current, audio: value }))}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                {editingPoetryTitle ? <Save size={16} /> : <Plus size={16} />}
                {editingPoetryTitle ? "Update Poetry" : "Add Poetry"}
              </button>
              {editingPoetryTitle ? (
                <button
                  type="button"
                  onClick={cancelPoetryEdit}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  <X size={16} />
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </motion.form>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr,1fr]">
          <ListPanel
            title="Manage Project Posts"
            items={projects}
            descriptor={(item) => `${item.category} / ${item.year}`}
            onEdit={startProjectEdit}
            onDelete={onDeleteProject}
          />
          <ListPanel
            title="Manage Poetry Posts"
            items={poetryCards}
            descriptor={(item) => item.type}
            onEdit={startPoetryEdit}
            onDelete={onDeletePoetry}
          />
        </div>
      </Container>
    </section>
  );
}

function ListPanel({ title, items, descriptor, onEdit, onDelete }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="glass-panel rounded-[2rem] p-7 sm:p-8"
    >
      <h3 className="font-display text-2xl text-white">{title}</h3>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-14 w-14 rounded-2xl object-cover" />
              ) : null}
              <div>
                <p className="text-base text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate">{descriptor(item)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/[0.08]"
              >
                <Pencil size={15} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.title)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-red-400/40 hover:bg-red-500/10"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Input({ label, name, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-slate">{label}</span>
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
      />
    </label>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-slate">{label}</span>
      <textarea
        required
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
      />
    </label>
  );
}

function ImageInput({ label, value, onChange }) {
  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange(await readFileAsDataUrl(file));
  };

  return (
    <div>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-slate">{label}</span>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-white/15 bg-white/[0.03] px-4 py-5 text-center">
        <ImagePlus size={18} className="text-slate" />
        <span className="mt-3 text-sm text-white">Upload image</span>
        <span className="mt-1 text-xs text-slate">PNG, JPG, WEBP</span>
        <input type="file" accept="image/*" hidden onChange={handleFile} />
      </label>
      {value ? <img src={value} alt={label} className="mt-4 h-32 w-full rounded-[1.2rem] object-cover" /> : null}
    </div>
  );
}

function GalleryInput({ label, values, onChange }) {
  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const uploaded = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
    onChange(uploaded);
    event.target.value = "";
  };

  return (
    <div>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-slate">{label}</span>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-white/15 bg-white/[0.03] px-4 py-5 text-center">
        <ImagePlus size={18} className="text-slate" />
        <span className="mt-3 text-sm text-white">Upload gallery images</span>
        <span className="mt-1 text-xs text-slate">Select multiple PNG, JPG, or WEBP files</span>
        <input type="file" accept="image/*" multiple hidden onChange={handleFiles} />
      </label>
      {values?.length ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {values.map((image, index) => (
            <img
              key={`${label}-${index}`}
              src={image}
              alt={`${label} ${index + 1}`}
              className="h-24 w-full rounded-[1rem] object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AudioInput({ label, value, onChange }) {
  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange(await readFileAsDataUrl(file));
    event.target.value = "";
  };

  return (
    <div>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.3em] text-slate">{label}</span>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-white/15 bg-white/[0.03] px-4 py-5 text-center">
        <Headphones size={18} className="text-slate" />
        <span className="mt-3 text-sm text-white">Upload audio recitation</span>
        <span className="mt-1 text-xs text-slate">MP3, WAV, M4A, OGG</span>
        <input type="file" accept="audio/*" hidden onChange={handleFile} />
      </label>
      {value ? (
        <audio controls className="mt-4 w-full">
          <source src={value} />
        </audio>
      ) : null}
    </div>
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
