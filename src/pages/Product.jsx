import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            WorldWise is an innovative travel companion app designed to keep track of your adventures around the globe. With its intuitive interface and comprehensive features,
          </p>
          <p>
            WorldWise allows you to create a personalized world map that documents every city you&apos;ve visited, ensuring that you never forget your wonderful experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
