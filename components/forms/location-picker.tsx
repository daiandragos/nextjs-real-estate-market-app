"use client";

import { useCallback, useEffect, useState } from "react";
import type { GeoPoint } from "@/types";

interface LocationPickerProps {
  value?: GeoPoint;
  onChange: (location: GeoPoint) => void;
  disabled?: boolean;
}

export function LocationPicker({
  value,
  onChange,
  disabled,
}: LocationPickerProps) {
  const [viewState, setViewState] = useState({
    longitude: value?.lng ?? -98.5795,
    latitude: value?.lat ?? 39.8283,
    zoom: value ? 14 : 4,
  });

  // Sync viewState when value prop changes (e.g., from address autocomplete)
  useEffect(() => {
    if (value) {
      setViewState((prev) => ({
        ...prev,
        longitude: value.lng,
        latitude: value.lat,
        zoom: 15, // Zoom in when address is selected
      }));
    }
  }, [value?.lat, value?.lng, value]);

  return (
    <div className="space-y-2">
      <div
        className={`relative h-75 w-full rounded-lg overflow-hidden border ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        Map goes here
      </div>

      {value ? (
        <p className="text-sm text-muted-foreground">
          📍 Selected: {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Select an address above or click on the map to set the property
          location
        </p>
      )}
    </div>
  );
}
