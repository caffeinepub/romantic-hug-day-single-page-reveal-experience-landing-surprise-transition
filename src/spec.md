# Specification

## Summary
**Goal:** Fix Phase 2 (Reveal) background and audio playback issues, and update Phase 1/Phase 2 teddy visuals to match the requested transparent/glassmorphism look.

**Planned changes:**
- Ensure Phase 2 uses the existing uploaded background image asset (photo4.jpg) and renders it clearly behind overlays/content after the Phase 1 button click.
- Fix Phase 2 audio loading/playback using the existing uploaded song file, attempt autoplay on the button click, and show a manual play fallback control if autoplay is blocked.
- Update Phase 2 to use a transparent (alpha) hugging-bears image and adjust styling so both the bears and the glassmorphism message card remain semi-transparent while keeping the message text readable.
- Update Phase 1 hero image to a single teddy holding a heart that says "i love you", keeping the existing heading and button text unchanged and ensuring the hero image stays crisp, centered, and mobile-friendly.

**User-visible outcome:** After clicking the Phase 1 button, users see the Reveal screen with the uploaded photo background visible and the romantic song reliably playing (or a clear play control if autoplay is blocked), plus updated teddy visuals (transparent hugging bears in Phase 2 and a heart-holding teddy hero in Phase 1).
