import { Form, Modal, Select } from "antd";
import { rolesOption } from "../enum";

export default function AssignMemberModal({
  isOpen,
  onAdd,
  onClose,
  unassignedMembers,
}) {
  return (
    <Modal title="Assign member" open={isOpen} onOk={onAdd} onCancel={onClose}>
      <Form style={{ display: "flex", gap: "1rem" }}>
        <Select
          showSearch
          placeholder="Select a member"
          optionFilterProp="children"
          // value={selectedMember}
          style={{ width: "100%", marginTop: "10px" }}
          // onChange={(values) => setSelectedMember(values)}
          allowClear
        >
          {unassignedMembers?.map((member) => (
            <Select.Option key={member.id} value={member.id}>
              {member.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          showSearch
          placeholder="Select a role"
          optionFilterProp="children"
          // value={selectedMember}
          style={{ width: "100%", marginTop: "10px" }}
          allowClear
          // onChange={(values) => setSelectedMember(values)}
        >
          {rolesOption?.map((role) => (
            <Select.Option key={role.value} value={role.value}>
              {role.label}
            </Select.Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
}
