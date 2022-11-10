import { request } from '@umijs/max';

// permission module
export async function CreatePermissionModule(
  data: API.RequestCreatePermissionModule,
) {
  return request<API.ResponsePermissionModule>(
    'root/api/permission/module/create',
    {
      method: 'POST',
      data: data,
    },
  );
}

export async function UpdatePermissionModule(
  data: API.RequestUpdatePermissionModule,
) {
  return request<API.ResponsePermissionModule>(
    'root/api/permission/module/update',
    {
      method: 'PUT',
      data: data,
    },
  );
}

export async function DeletePermissionModule(
  data: API.RequestDeletePermissionModule,
) {
  return request<API.APIResponse>('root/api/permission/module/delete', {
    method: 'DELETE',
    data: data,
  });
}