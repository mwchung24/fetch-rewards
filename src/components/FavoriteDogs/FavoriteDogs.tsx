import {TDog} from '../../types';
import styles from './FavoriteDogs.module.css';

const FavoriteDogs = ({dogs}: {dogs: TDog[]}) => {
  return (
    <div>
      <h2>Favorites:</h2>
      <ul className={styles.favoriteDogs}>
        {dogs?.map((dog: TDog) => {
          return (
            <li key={dog.id} className={styles.favorite}>
              <img className={styles.dogImage} src={dog.img} alt="dog" />
              <div className={styles.dogName}>{dog.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoriteDogs;
