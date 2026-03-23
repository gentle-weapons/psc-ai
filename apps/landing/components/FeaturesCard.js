// A component used to display available features based on the type of user.
//
// `type` - the type of user (consumer, developer), as a string
// `tag` - the tagline of the features card, as a string
// `title` - the title of the features card, as a string
// `description` - a plain text description of the features card, as a string
// `features` - the important features to list, as an array of strings

import styles from './FeaturesCard.module.css'

export default function FeaturesCard({ type, tag, title, description, features }) {
  return (
    <div className={`${styles.audienceCard} ${styles[type]}`}>
        <div className={`${styles.audienceTag} ${styles[type]}`}>
            <span className={`${styles.tagPip} ${styles[type]}`} /> {tag}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className={styles.featureList}>
            {features.map((feature, index) => (
                <li className={styles.featureItem} key={index}>
                    <div className={`${styles.fiCheck} ${styles[type]}`}>✓</div>
                    <div>{feature}</div>
                </li>
            ))}
        </ul>
    </div>
  );
}