import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigateParams } from 'custom/useCustomNavigate';
import useQueryString from 'custom/useQueryString';
import './index.scss';

interface PaginationProps {
  totalPages?: number;
  refetch?: () => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages = 1 }) => {
  const navigate = useNavigateParams();
  const currentPage = Number(useQueryString('page')) || 1;
  const handleChange = ({ selected }: { selected: number }) =>
    navigate({ page: selected + 1 });

  return (
    <nav>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        onPageChange={handleChange}
        pageRangeDisplayed={2}
        className="pagination mt-4"
        activeClassName="active"
        pageLinkClassName="page-link"
        pageCount={totalPages!}
        pageClassName={`page-item`}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={!!currentPage ? currentPage - 1 : 0}
      />
    </nav>
  );
};

export default Pagination;
