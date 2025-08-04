'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import SummernoteEditor from '@/components/HtmlEditor/SummernoteEditor';
import FileInput from '@/components/form/input/FileInput';
import { toast } from 'react-hot-toast';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useLoading } from '@/context/LoadingContext';

const SOCIAL_OPTIONS = [
  'facebook',
  'linkedin',
  'instagram',
  'twitter',
  'github',
  'gmail',
  'youtube',
  'portfolio',
];

export default function AddTeamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { isLoading, setIsLoading } = useLoading();

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      (async () => {
        try {
          const response = await fetch(`/api/v1/admin/teams/${id}`, {
            method: 'GET',
            credentials: 'include',
          });

          const result = await response.json();
          if (result.success && result.data) {
            const team = result.data;
            setName(team.name);
            setDesignation(team.designation);
            setDepartment(team.department);
            setDescription(team.description);

            // Convert object to array for editing
            if (team.socialLinks && typeof team.socialLinks === 'object') {
              const formattedLinks = Object.entries(team.socialLinks).map(([platform, url]) => ({
                platform,
                url,
              }));
              setSocialLinks(formattedLinks);
            }

            if (team.profileImage) {
              setProfileImageUrl(team.profileImage); // full image URL expected
            }
          } else {
            toast.error('Failed to fetch team data');
          }
        } catch (error) {
          toast.error('Error loading team');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('department', department);
    formData.append('description', description);

    const socialObject = socialLinks.reduce((acc, curr) => {
      if (curr.platform && curr.url) acc[curr.platform] = curr.url;
      return acc;
    }, {} as Record<string, string>);
    formData.append('socialLinks', JSON.stringify(socialObject));

    if (profileImage) formData.append('profileImage', profileImage);

    const url = id ? `/api/v1/admin/teams/update/${id}` : `/api/v1/admin/teams/create`;
    const method = id ? 'PATCH' : 'POST';

    const promise = fetch(url, {
      method,
      credentials: 'include',
      body: formData,
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }
      return result;
    });

    toast.promise(promise, {
      loading: id ? 'Updating team...' : 'Creating team...',
      success: () => {
        router.push('/admin/teams');
        return id ? 'Team updated successfully!' : 'Team created successfully!';
      },
      error: (err) => err.message || 'Something went wrong',
    });
  };

  const addNewSocialLink = (platform: string) => {
    if (socialLinks.find((s) => s.platform === platform)) return;
    setSocialLinks([...socialLinks, { platform, url: '' }]);
  };

  const updateSocialLink = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index].url = value;
    setSocialLinks(updated);
  };

  const removeSocialLink = (platform: string) => {
    setSocialLinks(socialLinks.filter((s) => s.platform !== platform));
  };

  const availableOptions = SOCIAL_OPTIONS.filter(
    (option) => !socialLinks.find((s) => s.platform === option)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Add Team" />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-100 dark:border-white/10 w-full space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              placeholder="Enter designation"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              placeholder="Enter department"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Upload Profile Image</label>

          {profileImageUrl && !profileImage && (
            <div className="mb-2">
              <img
                src={profileImageUrl}
                alt="Uploaded profile"
                className="w-28 h-28 object-cover rounded cursor-pointer hover:opacity-80 border"
                onClick={() => window.open(profileImageUrl, '_blank')}
              />
            </div>
          )}

          <FileInput onChange={(e) => setProfileImage(e.target.files?.[0] || null)} required={!id} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Description</label>
          <SummernoteEditor value={description} onChange={setDescription} height={300} fullWidth />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Social Media Links</label>
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-3 items-center text-gray-700 dark:text-white">
                <span className="capitalize text-sm w-24 text-gray-700 dark:text-white">{link.platform}</span>
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(link.platform)}
                  className="text-red-500 text-lg font-bold px-2 text-gray-700 dark:text-white"
                >
                  ×
                </button>
              </div>
            ))}

            {availableOptions.length > 0 && (
              <div className="mt-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) addNewSocialLink(e.target.value);
                    e.target.selectedIndex = 0;
                  }}
                  className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white"
                >
                  <option value="">+ Add Platform</option>
                  {availableOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center mt-6 gap-3 w-full flex-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            {isLoading ? (id ? 'Updating...' : 'Saving...') : id ? 'Update Team' : 'Save Team'}
          </button>
        </div>
      </form>
    </div>
  );
}
