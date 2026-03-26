export function notifyProspectContentUpdated(savedId: string) {
  window.postMessage(
    {
      type: "SIGNALIZE_PROSPECT_CONTENT_UPDATED",
      savedId,
    },
    window.location.origin,
  );
}

export function notifyProspectStatusUpdated(savedId: string, status: string) {
  window.postMessage(
    {
      type: "SIGNALIZE_PROSPECT_STATUS_UPDATED",
      savedId,
      status,
    },
    window.location.origin,
  );
}
