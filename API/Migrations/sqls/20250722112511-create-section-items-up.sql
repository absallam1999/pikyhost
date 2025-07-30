/* Replace with your SQL commands */
CREATE TABLE section_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NOT NULL,
  title VARCHAR(255) NULL,
  body_en JSON NULL,
  body_ar JSON NULL,
  subtitle_en VARCHAR(255) NULL,
  subtitle_ar VARCHAR(255) NULL,
  description_en VARCHAR(500) NULL,
  description_ar VARCHAR(500) NULL,
  pricing VARCHAR(500) NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
);