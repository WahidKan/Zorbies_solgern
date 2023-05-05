using System;

namespace Solgen.Formstack
{
    public class WebMergeException : Exception
    {
        public WebMergeException()
            : base("[WebMerge Error]: Unspecified Error")
        {
        }

        public WebMergeException(string message)
            : base($"[WebMerge Error]: {message}")
        {
        }
    }
}
