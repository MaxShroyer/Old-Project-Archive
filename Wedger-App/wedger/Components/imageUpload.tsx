import storage from '@react-native-firebase/storage';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export async function ImageUpload(image: string): Promise<string> {
  try {
    const reference = storage().ref('images').child(Date.now().toString());

    await reference.putString(image, 'base64');

    const imageURL = await reference.getDownloadURL();
    return imageURL;
  } catch (error) {
    throw new Error('Error uploading image: ' + error);
  }
}

export async function ImageParsing(
  imageURL: any,
): Promise<{item: string; price: string}[]> {
  try {
    if (imageURL) {
      console.log('Retrieved imageURL:', imageURL);

      const result = await TextRecognition.recognize(imageURL);
      const itemsAndPrices: {item: string; price: string}[] = [];

      for (let block of result.blocks) {
        let foundPriceInBlock = false;

        for (let line of block.lines) {
          const itemPriceRegex = /^(.*?)\s*\$?\s*([\d.]+)$/; //using regex for filtering, future goal will be to use a custom trained model

          const match = line.text.match(itemPriceRegex);

          if (match && match.length === 3) {
            const itemName = match[1].trim();
            const price = match[2].trim();

            itemsAndPrices.push({item: itemName, price: price});

            foundPriceInBlock = true;
          }
        }

        if (foundPriceInBlock) {
          break;
        }
      }

      console.log('Extracted items and prices:', itemsAndPrices);

      return itemsAndPrices;
    } else {
      console.error('Invalid data structure or imageURL not found');
      return [];
    }
  } catch (error) {
    console.error('Error parsing image:', error);
    return [];
  }
}
