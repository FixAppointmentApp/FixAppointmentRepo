
export const readImage = (file:Blob, setImageUrl: (image:string)=> void)=> {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
}


