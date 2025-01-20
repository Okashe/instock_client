import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import WarehouseHeader from "../../components/WarehouseHeader/WarehouseHeader";
import WarehouseModal from "../../components/WarehouseModal/WarehouseModal";

function Warehouse() {
  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleOpenWarehouseModal = (event) => {
    const id = Number(event.target.id);
    setSelectedWarehouse(id);
    setWarehouseModalOpen(true);
  };

  const handleCloseWarehouseModal = () => {
    setWarehouseModalOpen(false);
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(
        `https://instock-api-d37f38c9d716.herokuapp.com/warehouses`
      );
      setWarehouseData(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://instock-api-d37f38c9d716.herokuapp.com/warehouses/match/${keyword}`
        );

        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debounceFetch = setTimeout(() => {
      if (keyword) {
        fetchResults();
      }
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [keyword]);

  return (
    <>
      <WarehouseModal
        isOpen={warehouseModalOpen}
        onClose={handleCloseWarehouseModal}
        warehouseId={selectedWarehouse}
        fetchData={fetchWarehouses}
      />
      <WarehouseHeader keyword={keyword} setKeyword={setKeyword} />
      <WarehouseList
        warehouses={warehouseData}
        results={results}
        handleOpenWarehouseModal={handleOpenWarehouseModal}
        keyword={keyword}
      />
    </>
  );
}

export default Warehouse;
