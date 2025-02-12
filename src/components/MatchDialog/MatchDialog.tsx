import {Dialog} from 'primereact/dialog';
import styles from './MatchDialog.module.css';
import {TDog} from '../../types';

const MatchDialog = ({
  isVisible,
  setIsVisible,
  matchedDog,
}: {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  matchedDog: TDog | null;
}) => {
  return (
    <div>
      {matchedDog ? (
        <Dialog
          header="We've found you a pawfect match!"
          visible={isVisible}
          onHide={() => {
            if (!isVisible) return;
            setIsVisible(false);
          }}
          className={styles.dialog}
        >
          <div className={styles.dogInfo}>
            <img className={styles.dogImage} src={matchedDog.img} alt="dog" />
            <div>
              <p className={styles.dogName}>Name: {matchedDog.name}</p>
              <p className={styles.dogBreed}>Breed: {matchedDog.breed}</p>
              <p className={styles.dogAge}>Age: {matchedDog.age}</p>
              <p className={styles.dogZipcode}>Zipcode: {matchedDog.zip_code}</p>
            </div>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
};

export default MatchDialog;
