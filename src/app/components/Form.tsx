export default function Form({ onSubmit, loading, buttonText} : {onSubmit: any, loading: boolean, buttonText: string}) {
  return (
    <form
    onSubmit={onSubmit}
    className="flex justify-center items-center bg-violet-700 my-3 py-3 px-4 rounded-md"
  >
    <button disabled={loading} type="submit">
      {buttonText}
    </button>
  </form>
  )
}
