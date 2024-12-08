import Breadcrumb from '../components/common/Breadcrumbs/Breadcrumb';
import TableOne from '../components/common/Tables/TableOne';
import TableThree from '../components/common/Tables/TableThree';
import TableTwo from '../components/common/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
