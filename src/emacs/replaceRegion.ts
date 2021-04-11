export function replaceRegion(text: string) {
  return `(unless (use-region-p)
    (error "Need an active region"))
  (delete-region (region-beginning) (region-end))
  (insert ${JSON.stringify(text)})`;
}
