import React, { useCallback } from "react";
import { Tool } from "sanity";

interface ImportResult {
  success: boolean;
  message: string;
  count?: number;
  error?: string;
}

export const importHospitalsAction: Tool = {
  name: "import-hospitals",
  title: "Import Hospitals",
  icon: () => "📤",
  component: () => {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<ImportResult | null>(null);

    const handleFileChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setResult(null);

        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/import-hospitals", {
            method: "POST",
            body: formData,
          });

          const data: ImportResult = await response.json();
          setResult(data);
        } catch (error) {
          setResult({
            success: false,
            message: "Error uploading file",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        } finally {
          setLoading(false);
        }
      },
      [],
    );

    return (
      <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>📤 Import Hospitals</h1>
        <p>Upload a CSV file to import multiple hospitals at once.</p>

        {/* Upload Section */}
        <div
          style={{
            border: "2px dashed #2276fc",
            borderRadius: "8px",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
            backgroundColor: "#f0f6ff",
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={loading}
            id="csv-upload"
            style={{ display: "none" }}
          />
          <label
            htmlFor="csv-upload"
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "500",
              color: "#2276fc",
            }}
          >
            {loading
              ? "⏳ Uploading..."
              : "📁 Click to select CSV file or drag & drop"}
          </label>
        </div>

        {/* Success/Error Message */}
        {result && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "2rem",
              backgroundColor: result.success ? "#d4edda" : "#f8d7da",
              color: result.success ? "#155724" : "#721c24",
              border: `1px solid ${result.success ? "#c3e6cb" : "#f5c6cb"}`,
            }}
          >
            <strong>{result.success ? "✅ Success!" : "❌ Error"}</strong>
            <p>{result.message}</p>
            {result.count && <p>Imported: {result.count} hospitals</p>}
            {result.error && <p>Error: {result.error}</p>}
          </div>
        )}

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#856404" }}>
            📋 Step-by-Step Instructions
          </h3>
          <ol style={{ color: "#856404", lineHeight: "1.8" }}>
            <li>
              <strong>Open Microsoft Excel</strong> or Google Sheets
            </li>
            <li>
              <strong>Follow the CSV format</strong> shown in the table below
            </li>
            <li>
              <strong>Enter your hospital data</strong> in the columns:
              <ul>
                <li>name (required)</li>
                <li>type (required)</li>
                <li>location (required)</li>
                <li>url (optional)</li>
              </ul>
            </li>
            <li>
              <strong>Save the file as CSV:</strong>
              <ul>
                <li>File → Save As</li>
                <li>Select format: CSV (Comma-delimited)</li>
                <li>Click Save</li>
              </ul>
            </li>
            <li>
              <strong>Upload the CSV file</strong> using the upload area above
            </li>
          </ol>
        </div>

        {/* CSV Format Table */}
        <div style={{ marginBottom: "2rem" }}>
          <h3>CSV Format Example</h3>
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#2276fc",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <th
                    style={{ padding: "12px", textAlign: "left", width: "20%" }}
                  >
                    name
                  </th>
                  <th
                    style={{ padding: "12px", textAlign: "left", width: "15%" }}
                  >
                    type
                  </th>
                  <th
                    style={{ padding: "12px", textAlign: "left", width: "25%" }}
                  >
                    location
                  </th>
                  <th
                    style={{ padding: "12px", textAlign: "left", width: "40%" }}
                  >
                    url
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", color: "#333" }}>
                    Doctor&apos;s Hospital
                  </td>
                  <td style={{ padding: "12px", color: "#333" }}>Hospital</td>
                  <td style={{ padding: "12px", color: "#333" }}>
                    General Santos City
                  </td>
                  <td style={{ padding: "12px", color: "#333" }}>
                    https://doctorshospital.com
                  </td>
                </tr>
                <tr
                  style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <td style={{ padding: "12px", color: "#333" }}>
                    City Clinic
                  </td>
                  <td style={{ padding: "12px", color: "#333" }}>Clinic</td>
                  <td style={{ padding: "12px", color: "#333" }}>Manila</td>
                  <td style={{ padding: "12px", color: "#999" }}>(empty)</td>
                </tr>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <td style={{ padding: "12px", color: "#333" }}>
                    Dr. Maria Santos
                  </td>
                  <td style={{ padding: "12px", color: "#333" }}>Doctor</td>
                  <td style={{ padding: "12px", color: "#333" }}>
                    Quezon City
                  </td>
                  <td style={{ padding: "12px", color: "#333" }}>
                    https://drmardesantos.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Format Requirements */}
        <div
          style={{
            backgroundColor: "#e7f3ff",
            border: "1px solid #b3d9ff",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#004085" }}>
            ✓ Format Requirements
          </h3>
          <ul style={{ color: "#004085", lineHeight: "1.8" }}>
            <li>
              <strong>Required columns:</strong> name, type, location
            </li>
            <li>
              <strong>Optional columns:</strong> url
            </li>
            <li>
              <strong>Type must be one of:</strong> Hospital, Clinic, or Doctor
            </li>
            <li>
              <strong>First row should contain headers:</strong> name, type,
              location, url
            </li>
            <li>
              <strong>File format:</strong> CSV (Comma-delimited) - .csv
              extension
            </li>
            <li>
              <strong>No special characters:</strong> Avoid using special
              characters in the name column that might conflict with CSV format
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
