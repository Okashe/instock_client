import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import WarehouseInfo from "../../components/WarehouseInfo/WarehouseInfo";
import WarehouseInventory from "../../components/WarehouseInventory/WarehouseInventory";
import InventoryModal from "../../components/InventoryModal/InventoryModal";

function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");

  const handleOpenInventoryModal = (event) => {
    const id = Number(event.target.id);
    setSelectedInventory(id);
    setInventoryModalOpen(true);
  };

  const handleCloseInventoryModal = () => {
    setInventoryModalOpen(false);
  };

  const getWarehouse = async () => {
    try {
      const response = await axios.get(
        `https://instock-api-d37f38c9d716.herokuapp.com/warehouses/${id}`
      );
      setWarehouseData(response.data);
    } catch (error) {
      console.error(`Error fetching warehouse id: ${id}`);
    }
  };

  const getWarehouseInventory = async () => {
    try {
      const response = await axios.get(
        `https://instock-api-d37f38c9d716.herokuapp.com/warehouses/${id}/inventories`
      );
      setWarehouseInventory(response.data);
    } catch (error) {
      console.error(`Error fetching warehouse inventory id: ${id}`);
    }
  };

  useEffect(() => {
    getWarehouse();
    getWarehouseInventory();
  }, []);

  return (
    <>
      <WarehouseInfo warehouse={warehouseData} />
      <WarehouseInventory
        inventory={warehouseInventory}
        handleOpenInventoryModal={handleOpenInventoryModal}
      />
      <InventoryModal
        isOpen={inventoryModalOpen}
        onClose={handleCloseInventoryModal}
        inventoryId={selectedInventory}
        fetchData={getWarehouseInventory}
      />
    </>
  );
}

export default WarehouseDetails;
