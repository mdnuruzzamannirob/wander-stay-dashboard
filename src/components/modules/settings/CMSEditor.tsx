'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';

type ContentSection = {
  id: string;
  title: string;
  content: string;
};

type CMSEditorProps = {
  pageTitle: string;
  pageDescription: string;
  initialSections: ContentSection[];
};

export default function CMSEditor({ pageTitle, pageDescription, initialSections }: CMSEditorProps) {
  const [sections, setSections] = useState<ContentSection[]>(initialSections);

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSection = () => {
    const newId = `section-${Date.now()}`;
    setSections((prev) => [...prev, { id: newId, title: '', content: '' }]);
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900">{pageTitle}</h3>
        </div>
        <p className="text-sm text-gray-500">{pageDescription}</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="size-4 text-gray-300" />
                <span className="text-sm font-medium text-gray-500">Section {index + 1}</span>
              </div>
              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(section.id)}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  placeholder="Enter section title..."
                  className="focus:border-primary focus:ring-primary/30 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition outline-none focus:ring-1"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  rows={5}
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  placeholder="Enter content..."
                  className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm leading-relaxed transition outline-none focus:ring-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={addSection}
          className="hover:border-primary hover:text-primary flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-500 transition"
        >
          <Plus className="size-4" />
          Add New Section
        </button>

        <button className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition">
          <Save className="size-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
