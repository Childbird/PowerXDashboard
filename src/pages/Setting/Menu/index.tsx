import {
  ActionType,
  EditableProTable,
  PageContainer,
  ProCard,
  ProColumns,
  ProForm,
  ProFormField,
  ProFormInstance,
  useRefFunction,
} from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { waitTime } from '@/utils/format';
import { globalMenus } from '@/models/menu';
import { GetParentPermissionModule } from '@/utils/Menu';

const LoopPermissionModuleFilter = (
  data: API.Menu[],
  id: React.Key | undefined,
): any[] => {
  return data
    .map((item) => {
      // 如果当前查询的id等于遍历的menu.permissionModuleID，则去检查children
      if (item.permissionModuleID !== id) {
        if (item.children) {
          const newChildren = LoopPermissionModuleFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as API.Menu[];
};

const SetupMenu: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>();
  const [menus, setMenus] = useState<API.Menu[]>(globalMenus);

  const removeRow = useRefFunction((record: API.Menu) => {
    console.log('remove id', record.permissionModuleID);
    setMenus(LoopPermissionModuleFilter(menus, record.permissionModuleID));
  });
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.Menu>[] = [
    {
      title: '功能模块名称',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '模块ID',
      key: 'id',
      dataIndex: 'permissionModuleID',
      width: '10%',
    },
    {
      title: '上级模块名称',
      dataIndex: 'parentID',
      renderText: (text: any, record: API.Menu) => {
        // console.log(text, record, index, action)
        // console.log(record.parentID)
        const menu: API.Menu | undefined = GetParentPermissionModule(
          menus,
          record.parentID,
        );
        if (menu === undefined) {
          return '';
        } else {
          return menu.name;
        }
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(record.permissionModuleID);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            removeRow(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: '配置系统功能菜单',
      }}
    >
      <ProForm<{
        table: API.Menu[];
      }>
        formRef={formRef}
        // initialValues={{
        //   table: menus,
        // }}
        validateTrigger="onBlur"
      >
        <EditableProTable<API.Menu>
          params={{}}
          expandable={{
            // 使用 request 请求数据时无效
            defaultExpandAllRows: true,
          }}
          scroll={{
            x: 960,
          }}
          rowKey="permissionModuleID"
          headerTitle="可编辑表格"
          maxLength={5}
          // recordCreatorProps={false}
          recordCreatorProps={{
            position: 'top',
            newRecordType: 'dataSource',
            record: () => ({
              permissionModuleID: (Math.random() * 1000000).toFixed(0),
              name: '',
              uri: '',
              icon: '',
              component: '',
              description: '',
              parentID: '',
            }),
          }}
          columns={columns}
          value={menus}
          onChange={setMenus}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              console.log('onsave', rowKey, data, row);
              await waitTime(2000);
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm>
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(menus)}
        />
      </ProCard>
    </PageContainer>
  );
};
export default SetupMenu;
