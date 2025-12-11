export default function VideoCard({ video }) {
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let match;

    // watch?v=ID
    match = url.match(/v=([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // shorts/ID
    match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // youtu.be/ID
    match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    return "";
  };

  const isYouTube = video.url && getEmbedUrl(video.url);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold text-lg mb-2">{video.title}</h3>
      <p className="text-gray-600 mb-2">{video.description}</p>

      {isYouTube ? (
        <iframe
          title={video.title}
          width="100%"
          height="200"
          src={getEmbedUrl(video.url)}
          frameBorder="0"
          allowFullScreen
          className="rounded"
        />
      ) : video.file ? (
        <video
          src={`${import.meta.env.VITE_BACKEND_URL}${video.file}`}
          controls
          width="100%"
          className="rounded"
          style={{ maxHeight: "200px" }}
        />
      ) : (
        <p className="text-gray-400">Sin video disponible</p>
      )}
    </div>
  );
}
