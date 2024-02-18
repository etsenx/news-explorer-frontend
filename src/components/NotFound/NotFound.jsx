import notFound from "../../images/not-found_v1.png";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <img src={notFound} alt="Not Found" />
      <h2 className="notfound__heading">Tidak ada data yang ditemukan</h2>
      <p className="notfound__description">Maaf, tidak ada yang sesuai dengan data pencarianmu.</p>
    </div>
  );
}

export default NotFound;
