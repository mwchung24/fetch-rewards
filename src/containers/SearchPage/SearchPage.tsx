import {useEffect, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getAllDogIds, getDogs, getBreeds} from '../../data-provider/data-service';
import {TDog, TSearch} from '../../types';
import DogDataTable from '../../components/DataTable/DataTable';
import Search from '../../components/Search/Search';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [search, setSearch] = useState<TSearch | null>(null);

  const queryClient = useQueryClient();

  const fetchBreeds = useQuery({
    queryKey: ['breeds'],
    queryFn: getBreeds,
  });

  const fetchAllDogIds = useQuery({
    queryKey: ['dogIds', search],
    queryFn: () => getAllDogIds(0, 100, search),
  });

  const fetchDogs = useMutation({
    mutationFn: getDogs,
  });

  useEffect(() => {
    console.log(fetchAllDogIds.data);
    setDogIds(fetchAllDogIds.data?.resultIds);
  }, [fetchAllDogIds.data, search]);

  useEffect(() => {
    console.log('dogIds', dogIds);
    if (dogIds?.length) {
      fetchDogs.mutate(dogIds, {
        onSuccess: (res) => {
          setDogs(res);
        },
      });
    }
  }, [dogIds]);

  const handleSearch = (searchCriteria: TSearch) => {
    console.log('searchCriteria', searchCriteria);
    setSearch(searchCriteria);
    queryClient.invalidateQueries({queryKey: ['dogIds']});
  };

  console.log('dogs', dogs);

  return (
    <div className={styles.searchPage}>
      <Search breeds={fetchBreeds?.data} setSearch={handleSearch} />
      {!!dogs?.length && !!dogIds?.length ? <DogDataTable dogs={dogs} /> : <div>No results</div>}
    </div>
  );
};

export default SearchPage;
