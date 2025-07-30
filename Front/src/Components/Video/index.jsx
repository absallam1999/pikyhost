import "./index.scss";

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  if (!isOpen || !videoUrl) return null;

  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  const getYouTubeEmbedUrl = (url) => {
    let videoId = "";
    if (url.includes("youtube.com")) {
      const params = new URL(url).searchParams;
      videoId = params.get("v");
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/").pop();
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isYouTube ? (
          <iframe
            width="100%"
            height="400"
            src={getYouTubeEmbedUrl(videoUrl)}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube Video"
          />
        ) : (
          <video width="100%" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
