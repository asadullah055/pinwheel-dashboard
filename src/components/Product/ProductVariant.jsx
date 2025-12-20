import { getGroupedRows } from './createProductHelpers';
import VariantApplyAllBar from './VariantApplyAllBar';
import VariantAttributeForm from './VariantAttributeForm';
import { validatePrice } from './variantHelpers';
import VariantTable from './VariantTable';

export default function ProductVariant({ attributes, setAttributes, variantData, setVariantData, applyAll, setApplyAll }) {
  // 🚀 এখন state parent থেকে আসছে, তাই এখানকার লোকাল useState দরকার নেই
  const addAttribute = () => {
    if (attributes.length < 3) setAttributes([...attributes, { name: "", values: [] }]);
  };
  const removeAttribute = (idx) => setAttributes(attributes.filter((_, i) => i !== idx));
  const updateAttrName = (idx, value) =>
    setAttributes(attributes.map((a, i) => (i === idx ? { ...a, name: value } : a)));
  const addAttrValue = (idx, value) => {
    if (!value.trim()) return;
    const trimmed = value.trim();
    setAttributes(
      attributes.map((a, i) =>
        i === idx && !a.values.some(v => v === trimmed)
          ? { ...a, values: [...a.values, trimmed] }
          : a
      )
    );
  };
  const removeAttrValue = (aIdx, vIdx) =>
    setAttributes(attributes.map((a, i) => (i === aIdx ? { ...a, values: a.values.filter((_, j) => j !== vIdx) } : a)));

  const rows = attributes.every(a => a.values.length === 0) ? [] : getGroupedRows(attributes);
  const totalVariants = rows.length || 1;
  const handleChange = (key, field, value) => {
    setVariantData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
        // Default availability true if not set
        availability: prev[key]?.availability !== undefined ? prev[key].availability : true,
        _originalValue: prev[key]?._originalValue || {}
      },
    }));
  };


  const handleApplyAll = () => {
    setVariantData(prev => {
      if (rows.length === 0) {
        return {
          single: {
            price: applyAll.price !== "" ? applyAll.price : prev.single?.price || "",
            discountPrice:
              applyAll.discountPrice !== "" ? applyAll.discountPrice : prev.single?.discountPrice || "",
            stock: applyAll.stock !== "" ? applyAll.stock : prev.single?.stock || "",
            sku: applyAll.sku !== "" ? applyAll.sku : prev.single?.sku || "",
            availability: prev.single?.availability ?? true
          }
        };
      }

      const updated = {};
      rows.forEach((row) => {

        const key = row.map(val => val.toLowerCase()).join("|");

        let sku = applyAll.sku;
        if (sku) sku += "-" + row.join("-");

        updated[key] = {
          price: applyAll.price !== "" ? applyAll.price : prev[key]?.price || "",
          discountPrice:
            applyAll.discountPrice !== "" ? applyAll.discountPrice : prev[key]?.discountPrice || "",
          stock: applyAll.stock !== "" ? applyAll.stock : prev[key]?.stock || "",
          sku: applyAll.sku !== "" ? sku : prev[key]?.sku || "",
          availability: prev[key]?.availability ?? true,
          _originalValues: row
        };
      });

      return updated;
    });
  };



  const toggleAvailability = (key) => {
    // Key already comes normalized from VariantRow component
    setVariantData(prev => {
      const newData = { ...prev };
      if (!newData[key]) {
        newData[key] = {};
      }
      // Explicitly set true/false
      const currentAvailability = newData[key].availability;
      newData[key] = {
        ...newData[key],
        availability: currentAvailability === false ? true : false
      };
      return newData;
    });
  };
  return (
    <div>
      <VariantAttributeForm
        attributes={attributes}
        addAttribute={addAttribute}
        removeAttribute={removeAttribute}
        updateAttrName={updateAttrName}
        addAttrValue={addAttrValue}
        removeAttrValue={removeAttrValue}
      />

      {totalVariants >= 2 && (
        <VariantApplyAllBar applyAll={applyAll} setApplyAll={setApplyAll} handleApplyAll={handleApplyAll} />
      )}

      <VariantTable
        attributes={attributes}
        rows={rows}
        variantData={variantData}
        handleChange={handleChange}
        validatePrice={validatePrice}
        toggleAvailability={toggleAvailability}
      />
    </div>
  );
}