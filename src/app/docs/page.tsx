"use client";

import React, { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const res = await fetch("/api/v1/swagger");
        const data = await res.json();
        setSpec(data);
      } catch (err) {
        console.error("Failed to fetch Swagger spec:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpec();
  }, []);

  if (loading) return <div>Loading API Docs...</div>;
  if (!spec) return <div>Failed to load API Docs</div>;

  return <SwaggerUI spec={spec} />;
}
