const formattedFormText = (text: string) => {
  return text
    .slice(1, text.length - 1)
    .replace(/\\"/g, '')
    .replace(/\\n/g, ' ');
};

export default formattedFormText;
