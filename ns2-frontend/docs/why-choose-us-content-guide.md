# Homepage: Why Choose Us upload guide

Edit the homepage section whose `section_type` is **Why Choose Us** in your backend/admin. The frontend reads it from `/api/homepage/fetch-homepage`. Existing API fields are sufficient; no backend migration is required.

## Large photo on the left

1. Open the **Why Choose Us** homepage section.
2. Upload your lab/training photograph to **Primary image** (`primary_image`) on that section, not on a benefit content item.
3. Use a real photograph of students working with PLC panels, automation equipment, or an instructor in the lab. A landscape image around **1600 × 1200 pixels (4:3)** in WebP or JPEG works well. Keep the main subject near the center: tablet/mobile layouts use a wider crop. Avoid embedded text, collages, or logos as the main photograph.
4. Save and ensure the section's `is_active` is enabled.

If `primary_image` is empty, the section's **Background image** (`background_image`) appears in the same photo area as a fallback. It is never used as a section background. If both fields are empty, the photo area is omitted. Upload to `primary_image` to display the full intended layout.

## Heading and benefits

| Admin/API field               | Display                                                   |
| ----------------------------- | --------------------------------------------------------- |
| `super_heading`               | Small section label; defaults to “Why choose us” if empty |
| `heading`                     | Main heading above the photo                              |
| `subheading`                  | Description below the heading                             |
| `content_items[].title`       | Benefit title                                             |
| `content_items[].description` | Benefit description                                       |
| `content_items[].is_active`   | Set to false to hide a benefit                            |

Keep **four active content items** in the returned API order. The first active benefit receives the larger title and subtle neutral highlight. Numbers are generated automatically as 01–04. Titles of roughly 2–5 words and descriptions of roughly 20–35 words keep the section compact; longer content still wraps.

Benefit icons are supplied by the frontend: tools, processor, graduation cap, and checkmark, in that order. **Do not upload photographs to `content_items[].icon` for this section**: that legacy field is not rendered by the redesigned component. Only one section photograph is needed.

## Check after saving

The homepage API is cached for 60 seconds. Allow that cache to refresh, then reload the homepage. Check the third section at desktop and mobile widths. On desktop the intro/photo occupies 40% of the column space and the benefits 60%; benefits form a 2 × 2 grid. On mobile they stack for readability. The background remains white with a pale neutral highlight, including when the device uses dark mode.
