const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 
// ✅ FIX BUG 3: BỎ dòng require('./Prescription') ở đây
// Vì Prescription.js đã require PrescriptionItem.js rồi → nếu giữ lại sẽ tạo vòng lặp
// circular: Prescription → PrescriptionItem → Prescription → ... → crash khi khởi động
 
const PrescriptionItem = sequelize.define('PrescriptionItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  prescriptionId: { type: DataTypes.INTEGER, allowNull: false },
  medicineName: { type: DataTypes.STRING, allowNull: false },
  dosage: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  instruction: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: false });
 
module.exports = PrescriptionItem;