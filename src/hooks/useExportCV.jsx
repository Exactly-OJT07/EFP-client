export const useExportCV = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const exportCV = async (id) => {
    setIsLoading(true);
    try {
      const response = await exportCVAPI({ id });
      console.log("Phản hồi từ server:", response.data);
    } catch (err) {
      setError("Export CV Error.");
      console.error("Call API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { exportCV, isLoading, error };
};
