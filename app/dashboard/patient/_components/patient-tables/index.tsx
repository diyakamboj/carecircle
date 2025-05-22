'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Patient } from '@/constants/data';
import { columns } from '../patient-tables/columns';
import {
  COUNTRY_OPTIONS,
  usePatientTableFilters
} from './use-patient-table-filters';

export default function PatientTable({
  data,
  totalData
}: {
  data: Patient[];
  totalData: number;
}) {
  const {
    countryFilter,
    setCountryFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = usePatientTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="country"
          title="Country"
          options={COUNTRY_OPTIONS}
          setFilterValue={setCountryFilter}
          filterValue={countryFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
