import {useState} from 'react';
import {DataTable, DataTableSelectionMultipleChangeEvent} from 'primereact/datatable';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TDog} from '../../types';
import styles from './DataTable.module.css';

const DogDataTable = ({dogs}: {dogs: TDog[]}) => {
  const [selectedDogs, setSelectedDogs] = useState<TDog[] | null>(null);

  const dogImageTemplate = (dog: TDog) => {
    return <img className={styles.dogImage} src={dog.img} alt="dog" />;
  };

  const handleSelectedRow = (e: DataTableSelectionMultipleChangeEvent<any>) => {
    setSelectedDogs(e.value);
  };

  return (
    <div className={styles.dataTableWrapper}>
      <Button
        disabled={!selectedDogs || selectedDogs.length === 0}
        label="Find a match!"
        type="button"
        className={styles.matchButton}
      />
      <DataTable
        stripedRows
        value={dogs}
        paginator
        rows={25}
        totalRecords={10000}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        resizableColumns={true}
        selectionMode={'multiple'}
        selection={selectedDogs}
        onSelectionChange={handleSelectedRow}
      >
        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
        <Column body={dogImageTemplate} header="Picture" />
        <Column sortable field="name" header="Name" />
        <Column sortable field="breed" header="Breed" />
        <Column sortable field="age" header="Age" />
        <Column sortable field="zip_code" header="Zip code" />
      </DataTable>
    </div>
  );
};

export default DogDataTable;
