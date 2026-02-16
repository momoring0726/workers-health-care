import React, { useCallback, useState } from "react";
import { Tool } from "sanity";
import { useClient } from "sanity";

interface DeleteResult {
  success: boolean;
  message: string;
  deletedCount?: number;
  error?: string;
}

export const bulkDeleteAction: Tool = {
  name: "bulk-delete",
  title: "Bulk Delete",
  icon: () => "🗑️",
  component: () => {
    const client = useClient({ apiVersion: "2026-02-08" });
    const [documentType, setDocumentType] = useState("hospital");
    const [documents, setDocuments] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DeleteResult | null>(null);

    const fetchDocuments = useCallback(async () => {
      setLoading(true);
      setResult(null);
      try {
        const query = `*[_type == $type && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...100] {
          _id,
          _type,
          name,
          title,
          _createdAt
        }`;
        const docs = await client.fetch(query, { type: documentType });
        setDocuments(docs);
        setSelectedIds(new Set());
      } catch (error) {
        setResult({
          success: false,
          message: "Failed to fetch documents",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    }, [client, documentType]);

    const handleDelete = useCallback(async () => {
      if (selectedIds.size === 0) {
        setResult({
          success: false,
          message: "No documents selected",
        });
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete ${selectedIds.size} document(s)? This action cannot be undone.`,
      );

      if (!confirmed) return;

      setLoading(true);
      setResult(null);

      try {
        const transaction = client.transaction();
        selectedIds.forEach((id) => {
          transaction.delete(id);
        });

        await transaction.commit();

        setResult({
          success: true,
          message: `Successfully deleted ${selectedIds.size} document(s)`,
          deletedCount: selectedIds.size,
        });

        // Refresh the list
        await fetchDocuments();
      } catch (error) {
        setResult({
          success: false,
          message: "Failed to delete documents",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    }, [client, selectedIds, fetchDocuments]);

    const toggleSelection = (id: string) => {
      const newSelection = new Set(selectedIds);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedIds(newSelection);
    };

    const toggleSelectAll = () => {
      if (selectedIds.size === documents.length) {
        setSelectedIds(new Set());
      } else {
        setSelectedIds(new Set(documents.map((d) => d._id)));
      }
    };

    return (
      <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>🗑️ Bulk Delete Documents</h1>
        <p>Select and delete multiple published documents at once.</p>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "500",
            }}
          >
            Document Type:
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "1rem",
              color: "#333",
              backgroundColor: "white",
            }}
          >
            <option value="hospital">Hospital</option>
            <option value="news">News</option>
            <option value="newsCategory">News Category</option>
            <option value="location">Location</option>
          </select>
          <button
            onClick={fetchDocuments}
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2276fc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Load Documents"}
          </button>
        </div>

        {documents.length > 0 && (
          <>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.size === documents.length}
                  onChange={toggleSelectAll}
                  id="select-all"
                />
                <label htmlFor="select-all" style={{ marginLeft: "0.5rem" }}>
                  Select All ({documents.length} documents)
                </label>
              </div>
              <button
                onClick={handleDelete}
                disabled={loading || selectedIds.size === 0}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: selectedIds.size > 0 ? "#dc3545" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    loading || selectedIds.size === 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Delete Selected ({selectedIds.size})
              </button>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead
                  style={{
                    backgroundColor: "#f5f5f5",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        width: "40px",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Select
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Name/Title
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        textAlign: "left",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr
                      key={doc._id}
                      style={{
                        backgroundColor: selectedIds.has(doc._id)
                          ? "#e7f3ff"
                          : "white",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td style={{ padding: "0.75rem" }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(doc._id)}
                          onChange={() => toggleSelection(doc._id)}
                        />
                      </td>
                      <td style={{ padding: "0.75rem", color: "#333" }}>
                        {doc.name || doc.title || "Untitled"}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          fontSize: "0.85rem",
                          color: "#666",
                        }}
                      >
                        {doc._id}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          fontSize: "0.85rem",
                          color: "#666",
                        }}
                      >
                        {new Date(doc._createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {documents.length === 0 && !loading && (
          <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            No published documents found. Click "Load Documents" to start.
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: result.success ? "#d4edda" : "#f8d7da",
              color: result.success ? "#155724" : "#721c24",
              border: `1px solid ${result.success ? "#c3e6cb" : "#f5c6cb"}`,
            }}
          >
            <strong>{result.success ? "✅ Success!" : "❌ Error"}</strong>
            <p>{result.message}</p>
            {result.error && <p>Error: {result.error}</p>}
          </div>
        )}
      </div>
    );
  },
};
