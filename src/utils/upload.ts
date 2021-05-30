import rf from '@/services/requestFactory';

export async function uploadFile(payload: any) {
  return await rf.getRequest('Common').uploadFile(payload);
}
