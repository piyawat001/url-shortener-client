import React, { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import "./LinkForm.css";

const Domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export default function Links() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [LongUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      // ใน dev หาก Domain เป็น host ตรง ๆ ให้เรียกผ่าน "/api/shorten"
      // ใน prod สามารถตั้ง VITE_API_BASE_URL เป็น "https://your.host/api" ได้เช่นกัน
      const response = await axios.post(`${Domain}/api/shorten`, { longUrl: url });
      setShortUrl(response.data.shortUrl);
      setLongUrl(url);
      setUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Error shortening URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(shortUrl);
      
      // Show temporary feedback
      const element = e.target.previousSibling || document.querySelector('.short-url');
      const originalText = element.textContent;
      element.textContent = 'Copied!';
      element.style.color = '#28a745';
      
      setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
      }, 1500);
      
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Failed to copy to clipboard");
    }
  };
  
  const handleUrlClick = () => {
    // Open in new tab when clicking the URL text
    window.open(shortUrl, "_blank");
  };

  return (
    <div className="LinkForm">
      <div className="LinkForm-header">
        <h2>🔗 URL Shortener</h2>
        
        {!shortUrl && (
          <div className="tips-section">
            <div 
              className="tips-header" 
              onClick={() => setShowTips(!showTips)}
            >
              <h3>💡 วิธีการใช้งาน</h3>
              <span className={`arrow ${showTips ? 'open' : ''}`}>▼</span>
            </div>
            
            {showTips && (
              <div className="tips-content">
                <ul className="tips-list">
                  <li>📝 วาง URL ที่ยาวในช่องด้านล่าง</li>
                  <li>⚡ กดปุ่ม "ย่อ URL" เพื่อสร้างลิงก์สั้น</li>
                  <li>📋 กดปุ่มคัดลอกเพื่อคัดลอกไปยังคลิปบอร์ด</li>
                  <li>📱 สแกน QR Code เพื่อแชร์ผ่านมือถือ</li>
                  <li>🔗 คลิกที่ลิงก์สั้นเพื่อเปิดในแท็บใหม่</li>
                </ul>
                <div className="example-box">
                  <p><strong>ตัวอย่าง:</strong></p>
                  <p className="example-text">
                    จาก: <span className="long-example">https://website-ที่มี-url-ยาวมาก.com/page/subpage?param=value</span><br/>
                    เป็น: <span className="short-example">https://rty.ink/abc123</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ใส่ URL ที่ต้องการย่อ..."
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "กำลังย่อ URL..." : "ย่อ URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <div className="url-row">
              <strong>URL เดิม:</strong>
              <a href={LongUrl} target="_blank" rel="noopener noreferrer">
                {LongUrl.length > 50 ? LongUrl.substring(0, 50) + "..." : LongUrl}
              </a>
            </div>

            <div className="url-row">
              <strong>URL สั้น:</strong>
              <span className="short-url" onClick={handleUrlClick} title="คลิกเพื่อเปิดในแท็บใหม่">
                {shortUrl.replace(/^https?:\/\//, '')}
              </span>
              <button 
                type="button" 
                onClick={handleCopyClick}
                className="copy-btn"
                title="คัดลอกไปยังคลิปบอร์ด"
              >
                📋
              </button>
            </div>

            <div style={{ marginTop: "16px" }}>
              <QRCode value={shortUrl} size={128} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
