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
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>📤 Import Hospitals</h1>
        <p>Upload a CSV file to import multiple hospitals at once.</p>

        <div
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "2rem",
            textAlign: "center",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9",
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
            }}
          >
            {loading
              ? "⏳ Uploading..."
              : "Click to select CSV file or drag & drop"}
          </label>
        </div>

        {result && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
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

        <div style={{ marginTop: "2rem", fontSize: "14px", color: "#666" }}>
          <h3>CSV Format</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            name,type,location,url St. Mary's Hospital,Hospital,New
            York,https://stmarys.com City Clinic,Clinic,Boston, Dr. John
            Smith,Doctor,Los Angeles,https://drjohn.com
          </pre>
          <p>
            <strong>Required columns:</strong> name, type, location
            <br />
            <strong>Optional columns:</strong> url
            <br />
            <strong>Type must be:</strong> Hospital, Clinic, or Doctor
          </p>
        </div>
      </div>
    );
  },
};
