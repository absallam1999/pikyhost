import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllAdminPasswords,
  createAdminPassword,
  deleteAdminPassword,
} from "../../Services/Models/admin";
import { fetchSections, updateSection } from "../../Services/Models/sections";
import {
  fetchSectionItems,
  updateSectionItem,
} from "../../Services/Models/items";
import { fetchBtns, updateBtn } from "../../Services/Models/btns";
import EditableInput from "../../Utils/EditableInput";
import EditableTextarea from "../../Utils/EditableTextarea";
import "./index.scss";

function isInvalidValue(val) {
  return (
    val === null ||
    val === undefined ||
    val === "null" ||
    val === "undefined" ||
    val?.trim?.() === ""
  );
}

export default function AdminPage() {
  const [adminPasswords, setAdminPasswords] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionItems, setSectionItems] = useState([]);
  const [btns, setBtns] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [admins, sectionsRes, itemsRes, btnsRes] = await Promise.all([
        getAllAdminPasswords(),
        fetchSections(),
        fetchSectionItems(),
        fetchBtns(),
      ]);

      setAdminPasswords(Array.isArray(admins?.data) ? admins.data : []);
      setSections(Array.isArray(sectionsRes?.data) ? sectionsRes.data : []);

      const validItems = Array.isArray(itemsRes?.data)
        ? itemsRes.data.filter((item) => item && item.id)
        : [];

      setSectionItems(validItems);
      setBtns(Array.isArray(btnsRes) ? btnsRes : []);
    } catch (err) {
      console.error("Error loading admin data:", err);
      toast.error("Failed to load admin data");
    }
  };

  const handleAddPassword = async () => {
    if (!newPassword) return;
    try {
      await createAdminPassword(newPassword);
      toast.success("Password added");
      setNewPassword("");
      loadAllData();
    } catch {
      toast.error("Failed to add password");
    }
  };

  const handleDeletePassword = async (id) => {
    if (adminPasswords.length === 1) {
      toast.warning("At least one admin password is required");
      return;
    }

    try {
      await deleteAdminPassword(id);
      setAdminPasswords((prev) => prev.filter((p) => p.id !== id));
      toast.success("Password deleted");
    } catch (err) {
      toast.error("Failed to delete password");
    }
  };

  const handleUpdateSection = async (section) => {
    try {
      await updateSection(section.key_name, section);
      toast.success("Section updated");
      loadAllData();
    } catch {
      toast.error("Failed to update section");
    }
  };

  const updateHeroItem = async (id, data) => {
    try {
      const formatBody = (val) => {
        if (!val) return { key: "", text: "", value: "" };
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return { key: "", text: val, value: val };
          }
        }
        if (typeof val === "object") {
          return {
            key: val.key || "",
            text: val.text || "",
            value: val.value || "",
          };
        }
        return { key: "", text: "", value: "" };
      };

      const formatted = {
        ...data,
        body_en: JSON.stringify(formatBody(data.body_en)),
        body_ar: JSON.stringify(formatBody(data.body_ar)),
      };

      await updateSectionItem(id, formatted);
      toast.success("Hero item updated");

      setSectionItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                ...data,
                body_en: formatBody(data.body_en),
                body_ar: formatBody(data.body_ar),
              }
            : i
        )
      );
    } catch (err) {
      toast.error("Failed to update hero item");
      console.error(err);
    }
  };

  const updatePricingItem = async (id, data) => {
    try {
      const formatBody = (val) => {
        if (!val) return [];

        if (typeof val === "object" && val?.value) {
          return val.value
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line);
        }

        if (typeof val === "string") {
          return val
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line);
        }

        return [];
      };

      const formatted = {
        ...data,
        body_en: JSON.stringify(formatBody(data.body_en)),
        body_ar: JSON.stringify(formatBody(data.body_ar)),
      };

      await updateSectionItem(id, formatted);
      toast.success("Item updated");

      setSectionItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                ...data,
                body_en: formatBody(data.body_en),
                body_ar: formatBody(data.body_ar),
              }
            : i
        )
      );
    } catch (err) {
      toast.error("Failed to update item");
      console.error("Update error:", err);
    }
  };

  const handleUpdateItem = async (id, data, sectionKeyName) => {
    try {
      if (sectionKeyName === "hero") {
        await updateHeroItem(id, data);
      } else if (sectionKeyName === "pricing-section") {
        await updatePricingItem(id, data);
      } else {
        const formatBodyDefault = (val) => {
          if (!val) return JSON.stringify({ key: "", text: "", value: "" });
          if (typeof val === "string") {
            try {
              return JSON.stringify(JSON.parse(val));
            } catch {
              return JSON.stringify({ key: "", text: val, value: val });
            }
          }
          if (typeof val === "object") {
            return JSON.stringify({
              key: val.key || "",
              text: val.text || "",
              value: val.value || "",
            });
          }
          return JSON.stringify({ key: "", text: "", value: "" });
        };

        const formatted = {
          ...data,
          body_en: formatBodyDefault(data.body_en),
          body_ar: formatBodyDefault(data.body_ar),
        };

        await updateSectionItem(id, formatted);
        toast.success("Item updated");

        setSectionItems((prev) =>
          prev.map((i) =>
            i.id === id
              ? {
                  ...i,
                  ...data,
                  body_en: JSON.parse(formatted.body_en),
                  body_ar: JSON.parse(formatted.body_ar),
                }
              : i
          )
        );
      }
    } catch (err) {
      toast.error(`Failed to update item in section: ${sectionKeyName}`);
      console.error(err);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...btns];
    updated[index][field] = value;
    setBtns(updated);
  };

  const handleUpdateBtn = async (btn) => {
    try {
      await updateBtn(btn.id, btn);
      toast.success("Updated");
      loadAllData();
    } catch (err) {
      toast.error("Failed to update button");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2>Admin Panel</h2>

      <section>
        <h3>Admin Passwords</h3>
        <div className="form-inline">
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Admin Password"
          />
          <button onClick={handleAddPassword}>Add</button>
        </div>
        <ul>
          {adminPasswords.map((pass) => (
            <li key={pass.id}>
              {pass.password_hash}{" "}
              <button
                onClick={() => handleDeletePassword(pass.id)}
                disabled={adminPasswords.length === 1}
                title={
                  adminPasswords.length === 1
                    ? "Can't Delete The only Password"
                    : "Delete password"
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Link Buttons</h3>
        <div className="form-grid">
          {btns.map((btn, index) => (
            <div key={btn.id} className="btn-form-group">
              <EditableInput
                value={btn.link}
                placeholder="Button Link"
                onChange={(val) => handleInputChange(index, "link", val)}
                onBlur={() => handleUpdateBtn(btn)}
              />
              <EditableInput
                value={btn.v_link}
                placeholder="Video Link"
                onChange={(val) => handleInputChange(index, "v_link", val)}
                onBlur={() => handleUpdateBtn(btn)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Sections & Items</h3>

        {sections.map((section) => {
          const items = sectionItems
            .filter((i) => i.section_id === section.id)
            .map((i) => {
              const parseBody = (body) => {
                if (!body) return { value: "" };

                if (typeof body === "object") {
                  if (Array.isArray(body)) {
                    return { value: body.join("\n") };
                  }
                  if ("value" in body) {
                    return body;
                  }
                  return { value: "" };
                }

                try {
                  const parsed = JSON.parse(body);

                  if (Array.isArray(parsed)) {
                    return { value: parsed.join("\n") };
                  }

                  if (
                    parsed &&
                    typeof parsed === "object" &&
                    "value" in parsed
                  ) {
                    return parsed;
                  }
                } catch (e) {
                  console.warn("parseBody failed:", body, e);
                }

                return { value: typeof body === "string" ? body : "" };
              };

              return {
                ...i,
                body_en: parseBody(i.body_en),
                body_ar: parseBody(i.body_ar),
              };
            })
            .filter(
              (i) =>
                !isInvalidValue(i.subtitle_en) ||
                !isInvalidValue(i.subtitle_ar) ||
                i.body_en?.value?.trim?.() !== "" ||
                i.body_ar?.value?.trim?.() !== ""
            );

          return (
            <div key={section.id} className="section-block">
              <h4>Section: {section.title}</h4>

              {section.description && (
                <>
                  <EditableInput
                    value={section.description.badge_en}
                    onChange={(val) =>
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                description: {
                                  ...s.description,
                                  badge_en: val,
                                },
                              }
                            : s
                        )
                      )
                    }
                    onBlur={() => handleUpdateSection(section)}
                    placeholder="Badge EN"
                  />

                  <EditableInput
                    value={section.description.badge_ar}
                    onChange={(val) =>
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                description: {
                                  ...s.description,
                                  badge_ar: val,
                                },
                              }
                            : s
                        )
                      )
                    }
                    onBlur={() => handleUpdateSection(section)}
                    placeholder="Badge AR"
                  />

                  <EditableInput
                    value={section.description.title_en}
                    onChange={(val) =>
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                description: {
                                  ...s.description,
                                  title_en: val,
                                },
                              }
                            : s
                        )
                      )
                    }
                    onBlur={() => handleUpdateSection(section)}
                    placeholder="Title EN"
                  />
                  <EditableInput
                    value={section.description.title_ar}
                    onChange={(val) =>
                      setSections((prev) =>
                        prev.map((s) =>
                          s.id === section.id
                            ? {
                                ...s,
                                description: {
                                  ...s.description,
                                  title_ar: val,
                                },
                              }
                            : s
                        )
                      )
                    }
                    onBlur={() => handleUpdateSection(section)}
                    placeholder="Title AR"
                  />
                </>
              )}

              <EditableInput
                value={section.subtitle_en}
                onChange={(val) =>
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id ? { ...s, subtitle_en: val } : s
                    )
                  )
                }
                onBlur={() => handleUpdateSection(section)}
                placeholder="Subtitle EN"
              />

              <EditableInput
                value={section.subtitle_ar}
                onChange={(val) =>
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id ? { ...s, subtitle_ar: val } : s
                    )
                  )
                }
                onBlur={() => handleUpdateSection(section)}
                placeholder="Subtitle AR"
              />

              <EditableInput
                value={section.description_en}
                onChange={(val) =>
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id ? { ...s, description_en: val } : s
                    )
                  )
                }
                onBlur={() => handleUpdateSection(section)}
                placeholder="Description EN"
              />

              <EditableInput
                value={section.description_ar}
                onChange={(val) =>
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id ? { ...s, description_ar: val } : s
                    )
                  )
                }
                onBlur={() => handleUpdateSection(section)}
                placeholder="Description AR"
              />

              {items.map((item) => (
                <div key={item.id} className="item-form">
                  <EditableInput
                    value={item.subtitle_en}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, subtitle_en: val } : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Subtitle EN"
                  />

                  <EditableInput
                    value={item.subtitle_ar}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, subtitle_ar: val } : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Subtitle AR"
                  />

                  <EditableInput
                    value={item.pricing}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, pricing: val } : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Pricing"
                  />

                  <EditableInput
                    value={item.description_en}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, description_en: val } : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Description EN"
                  />

                  <EditableInput
                    value={item.description_ar}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, description_ar: val } : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Description AR"
                  />

                  <EditableTextarea
                    value={item.body_en}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? {
                                ...i,
                                body_en: val,
                              }
                            : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Body EN"
                  />

                  <EditableTextarea
                    value={item.body_ar}
                    onChange={(val) =>
                      setSectionItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? {
                                ...i,
                                body_ar: val,
                              }
                            : i
                        )
                      )
                    }
                    onBlur={async () =>
                      await handleUpdateItem(item.id, item, section.key_name)
                    }
                    placeholder="Body AR"
                  />
                </div>
              ))}

              <hr />
            </div>
          );
        })}
      </section>
    </div>
  );
}
