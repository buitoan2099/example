export * from './CheckUtils';
export * from './DeviceUtils';
export * from './ScaleUtils';
export * from './MergeObject';
export * from './DateUtils';

export function convertJsonToFormData(data: any) {
  const formData = new FormData();
  for (const i in data) formData.append(i, data[i]);
  return formData;
}
