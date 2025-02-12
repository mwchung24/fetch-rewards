import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {MultiSelect} from 'primereact/multiselect';
import {TSearchFormInput, TSearch} from '../../types';
import styles from './Search.module.css';

const Search = ({setSearch, breeds}: {setSearch: (args: TSearch) => void; breeds: string[]}) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[] | null>(null);
  const defaultValues = {
    breeds: '',
    zipCodes: '',
    ageMin: '',
    ageMax: '',
  };

  const mappedBreeds = breeds?.map((breed) => {
    return {label: breed, value: breed};
  });

  //@ts-ignore
  const {register, handleSubmit} = useForm<TSearchFormInput>(defaultValues);

  const onSubmit = (data: TSearchFormInput) => {
    setSearch({
      breeds: selectedBreeds,
      zipCodes: data.zipCodes ? data.zipCodes?.split(', ') : null,
      ageMin: data.ageMin,
      ageMax: data.ageMax,
    });
  };
  return (
    <div className={styles.searchWrapper}>
      <h1>Find your pawfect friend!</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
        <MultiSelect
          className={styles.breedsInput}
          id="breeds"
          {...register('breeds', {required: false})}
          placeholder="Select breeds"
          value={selectedBreeds}
          onChange={(e) => setSelectedBreeds(e.value)}
          options={mappedBreeds}
        />
        <InputText
          className={styles.zipcodesInput}
          id="zipCodes"
          {...register('zipCodes', {required: false})}
          placeholder="Zip codes (ie. 11111, 22222)"
        />
        <InputText
          className={styles.ageMinInput}
          id="ageMin"
          {...register('ageMin', {required: false})}
          placeholder="Minimum age"
        />
        <InputText
          className={styles.ageMaxInput}
          id="ageMax"
          {...register('ageMax', {required: false})}
          placeholder="Maximum age"
        />
        <Button className={styles.searchSubmit} label="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Search;
