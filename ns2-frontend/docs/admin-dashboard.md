# Website dashboard

Open the frontend website at `/admin` and sign in with an existing **Django staff username and password**. Superusers can manage all website content. Other staff accounts need the relevant Django model permissions (`view`, `add`, `change`, `delete`). The dashboard respects these permissions. No new password or user database is needed.

## Editing pages

1. Choose a page from the sidebar, then choose a content collection.
2. Open an existing record or select **Add content**.
3. Edit text, upload images or documents, and select **Save changes**.
4. Use **View page** to review the public website in another tab.

Fields are grouped into text, images/downloads, links/contact details, and publishing/placement. Smaller order numbers appear first. **Visible on website** controls whether a record is published. Parent selectors place content inside a specific section, course, navigation link or footer group. **Manage items in this section** opens the children of the current section. Save a new parent before adding its children.

Section editors only show fields used by the selected section type. For section items, choose the parent section first; the matching fields appear immediately. For example, gallery items show an image and caption, FAQs show question/answer, and team items show profile information. Order, visibility and placement controls remain available. Changing the section type or parent updates the form without erasing stored values for hidden fields. Images accept JPG, PNG, WebP and GIF; downloads also accept PDF, DOC and DOCX. Maximum upload size is 10 MB. Current files can be previewed, replaced or removed. Saving a text change preserves existing uploaded images.

- **Home:** banners, partner logos, content sections, testimonials, FAQ, statistics and header notices.
- **About us:** page sections, director’s message, team, accreditations and gallery entries.
- **Courses & modules:** course records, thumbnails, downloadable brochures and syllabuses, listing-page sections and course-specific sections. Leave the course selector empty for listing-page sections.
- **Services:** hero copy/image, contact details, partners, services and value pillars. For list fields such as specifications, enter one item per line.
- **Contact:** page text and banner overrides, contact information, and contact/FAQ sections shared with Home. Existing contact cards continue using shared section items by default. To use the dedicated contact information record, enable **Use contact information** in the contact page text record. Maps remain controlled by the company’s Google Maps URL in Website settings.
- **Website settings:** company name, logo, footer contact, navigation/dropdowns, footer groups/links, subscription labels and social links.
- **Enquiry inbox:** read website submissions and open a reply in your email application. Enquiries cannot be altered or deleted through this dashboard.

Contact and announcement page copy are optional overrides: blank values keep the current default text. Each page has one configuration record; once it exists, edit that record.

## Publishing announcements

Create an active category first. In **Announcements**, add a title, category, short summary, optional detailed content, image or attachment, and a publish date. Leave **Visible on website** unchecked to save a draft. Enable it to publish today, or choose a future date to schedule publication. A hidden category hides its announcements too, including their detail URLs. Dates follow Django’s configured timezone (currently UTC).

Detailed content supports paragraphs, lists, bold/italic text, headings and safe links. Executable HTML and unsafe attributes are excluded from public responses. This publishes notices on the website; it does not send browser push, email or SMS notifications.

Changing an existing slug changes its website address; old links do not automatically redirect. Deletion is permanent and shows the count of related content that would also be deleted. Hiding content is usually preferable. Changes are recorded in Django’s admin action log.

## Running and deploying

The Next.js server proxies dashboard requests to Django. Browser authentication uses separate HTTP-only cookies scoped to `/api/dashboard`, with CSRF protection. The existing Django admin at the **backend** `/admin/` remains available.

Backend:

```powershell
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver 8001
```

Frontend:

```powershell
npm.cmd run build
npm.cmd run start
```

Use the existing `NEXT_PUBLIC_API_BASE_URL` to point to Django. Optionally set server-only `DASHBOARD_BACKEND_URL` for the dashboard proxy. Media URLs use the public API origin, so the public backend must serve the same uploaded media. A running Next.js server is required; the dashboard is not a static-export feature.

Set Django `CSRF_TRUSTED_ORIGINS` to include the exact frontend origin, including scheme and port (for example `http://localhost:3000` locally and `https://your-website.example` in production). Use HTTPS in production, and configure your reverse proxy to forward the correct host and scheme. See [Django’s CSRF documentation](https://docs.djangoproject.com/en/5.2/howto/csrf/) for deployment details. Standard Django session authentication requires CSRF checks for writes; the login endpoint also explicitly protects them.

For multiple Django workers, use a shared Django cache (for example Redis) so the dashboard login-attempt limit is shared across workers. No Redis dependency was added to this project. Staff access and model permissions are managed through the existing Django admin.

Most public requests already fetch fresh content. Existing homepage and services HTTP/CDN cache policies remain in place; cached pages can take a few minutes to reflect a change. The dashboard itself is never cached.

## Verification

Backend tests can use a separate in-memory SQLite database:

```powershell
$env:DATABASE_URL = 'sqlite:///:memory:'
.\venv\Scripts\python.exe manage.py test core homepage services aboutus modules announcements --noinput
```

Use a fresh terminal afterward so this temporary test database setting is not carried into the normal server.
