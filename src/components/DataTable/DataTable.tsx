import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {TDog} from '../../types';
import styles from './DataTable.module.css';

const DogDataTable = ({dogs}: {dogs: TDog[]}) => {
  const dogImageTemplate = (dog: TDog) => {
    return (
      <img
        className={styles.dogImage}
        src={dog.img}
        alt="dog"
        // className="w-6rem shadow-2 border-round"
      />
    );
  };

  return (
    <div className={styles.dataTableWrapper}>
      <DataTable
        showGridlines
        stripedRows
        value={dogs}
        paginator
        rows={25}
        totalRecords={10000}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        resizableColumns={true}
      >
        <Column className={styles.imageColumn} body={dogImageTemplate} header="Picture" />
        <Column sortable field="name" header="Name" />
        <Column sortable field="breed" header="Breed" />
        <Column sortable field="age" header="Age" />
        <Column sortable field="zip_code" header="Zip code" />
      </DataTable>
    </div>
  );
};

export default DogDataTable;
