   Ok(self.package_graph_plus()?.head())
    }

    /// For a given list of workspace packages, returns a tuple of (known, unknown) packages.
    ///
    /// Initializes the package graph if it isn't already done so, and returns an error if the
    pub fn partition_workspace_names<'a, B>(
        &self,
        names: impl IntoIterator<Item = &'a str>,
    ) -> Result<(B, B)>
    where
        B: Default + Extend<&'a str>,
    {
        let workspace = self.package_graph()?.workspace();
        let (known, unknown) = names
            .into_iter()
            .partition(|name| workspace.contains_name(name));
        Ok((known, unknown))
    }

    /// Returns information about the subsets for this workspace.
    pub fn subsets(&self) -> Result<&WorkspaceSubsets> {
        Ok(self.package_graph_plus()?.suffix())
