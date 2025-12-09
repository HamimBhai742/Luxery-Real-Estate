import CreatePropertyForm from '@/components/CreatePropertyForm';
export const metadata = {
  title: 'Create Property - Luxury Real Estate',
  description: 'Create a new property to sell or rent',
}
const CreateProperty = () => {
  return (
    <div>
      <CreatePropertyForm />
    </div>
  );
};

export default CreateProperty;
