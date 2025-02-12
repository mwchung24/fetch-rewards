import {useEffect, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getAllDogIds, getDogs, getBreeds, findMatch} from '../../data-provider/data-service';
import {TDog, TSearch} from '../../types';
import DogDataTable from '../../components/DataTable/DataTable';
import Search from '../../components/Search/Search';
import styles from './SearchPage.module.css';
import dogDigging from '../../images/dogdigging.jpg';
import MatchDialog from '../../components/MatchDialog/MatchDialog';

const SearchPage = () => {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [matchedDog, setMatchedDog] = useState<TDog | null>(null);
  const [search, setSearch] = useState<TSearch | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState<boolean>(false);

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

  const findDogMatch = useMutation({
    mutationFn: findMatch,
  });

  useEffect(() => {
    setDogIds(fetchAllDogIds.data?.resultIds);
  }, [fetchAllDogIds.data, search]);

  useEffect(() => {
    if (dogIds?.length) {
      fetchDogs.mutate(dogIds, {
        onSuccess: (res) => {
          setDogs(res);
          setIsLoading(false);
        },
      });
    }
  }, [dogIds]);

  const handleSearch = (searchCriteria: TSearch) => {
    setSearch(searchCriteria);
    queryClient.invalidateQueries({queryKey: ['dogIds']});
    setIsLoading(false);
  };

  const handleMatch = (selectedDogs: TDog[]) => {
    findDogMatch.mutate(selectedDogs, {
      onSuccess: (res) => {
        console.log('res', res);
        setShowMatchDialog(true);
        setMatchedDog(res.match);
      },
    });
  };

  return (
    <div className={styles.searchPage}>
      <Search breeds={fetchBreeds?.data} setSearch={handleSearch} />
      {!!dogs?.length && !!dogIds?.length ? (
        <DogDataTable dogs={dogs} handleMatch={handleMatch} />
      ) : (
        <div>
          {!fetchAllDogIds.isLoading && !isLoading && (
            <div className={styles.noResults}>
              <h2 className={styles.noResultsText}>
                No pup was found using your search criteria above. Please clear your filters and try
                again!
              </h2>
              <img className={styles.dogImage} src={dogDigging} alt="dog digging" />
            </div>
          )}
        </div>
      )}
      <MatchDialog
        isVisible={showMatchDialog}
        setIsVisible={setShowMatchDialog}
        matchedDog={matchedDog}
      />
    </div>
  );
};

export default SearchPage;
