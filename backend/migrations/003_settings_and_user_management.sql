-- Settings table for general site settings
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text', -- text, number, boolean, json
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (key, value, type, description) VALUES
  ('site_name', 'MyWebSite', 'text', 'Site adı'),
  ('site_description', 'Modern Portfolio & CMS', 'text', 'Site açıklaması'),
  ('footer_text', '© 2024 MyWebSite. Tüm hakları saklıdır.', 'text', 'Footer metni'),
  ('footer_links', '[]', 'json', 'Footer linkleri (JSON array)'),
  ('social_links', '{}', 'json', 'Sosyal medya linkleri (JSON object)'),
  ('youtube_api_key', '', 'text', 'YouTube API Key'),
  ('youtube_channel_id', 'UCDOQkn4DWRdpjoC-obymdHA', 'text', 'YouTube Kanal ID'),
  ('contact_email', '', 'text', 'İletişim e-postası'),
  ('contact_phone', '', 'text', 'İletişim telefonu')
ON CONFLICT (key) DO NOTHING;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

