/* Replace with your SQL commands */
CREATE TABLE sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NULL,
  description JSON NULL,
  subtitle_en VARCHAR(255) NULL,
  subtitle_ar VARCHAR(255) NULL,
  description_en VARCHAR(500) NULL,
  description_ar VARCHAR(500) NULL,
  button_label VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);